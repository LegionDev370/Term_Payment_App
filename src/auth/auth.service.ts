import {
  HttpException,
  HttpStatus,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '../customers/models/customer.model';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { jwtService } from '../jwt/jwt.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { MailService } from '../mail/mail.service';
import { Admin } from '../admin/models/admin.model';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer) private readonly customerRepo: typeof Customer,
    private readonly jwtService: jwtService,
    readonly mailService: MailService,
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
  ) {}
  async register(createCustomerDto: CreateCustomerDto, res: Response) {
    const findCustomer = await this.customerRepo.findOne({
      where: {
        username: createCustomerDto.username,
      },
    });
    if (!findCustomer) {
      const hashedPassword = await bcrypt.hash(createCustomerDto.password, 12);
      const uniqueKey = uuid();
      const customer = {
        ...createCustomerDto,
        password: hashedPassword,
      };
      const newCustomer = await this.customerRepo.create(customer);
      const { refresh_token } = await this.jwtService.generateToken({
        id: newCustomer.id,
      });
      res.cookie('refresh_token', refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      const hashed_refresh_token = await bcrypt.hash(refresh_token, 12);
      const updatedCustomer = await this.customerRepo
        .update(
          {
            hashed_refresh_token,
            activation_link: uniqueKey,
          },
          {
            where: {
              id: newCustomer.id,
            },
            returning: true,
          },
        )
        .then((updatedCustomer) => updatedCustomer[1][0]);
      if (updatedCustomer) {
        try {
          await this.mailService.sendUserConfirmationMail(updatedCustomer);
        } catch (error) {
          console.log(error);
        }
        return {
          message: 'Customer created successfully',
          data: updatedCustomer,
        };
      }
    }
    throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  }
  async onLogin(loginDto: LoginDto, res: Response) {
    const findCustomer = await this.customerRepo.findOne({
      where: {
        username: loginDto.username,
      },
    });
    const findAdmin = await this.adminRepo.findOne({
      where: {
        username: loginDto.username,
      },
    });
    if (!findCustomer && !findAdmin) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const isMatch = await bcrypt.compare(
      loginDto.password,
      findCustomer?.password ? findCustomer?.password : findAdmin?.password,
    );
    if (isMatch) {
      const { refresh_token } = await this.jwtService.generateToken({
        id: findCustomer?.id ? findCustomer?.id : findAdmin?.id,
      });
      res.cookie('refresh_token', refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      const hashed_refresh_token = await bcrypt.hash(refresh_token, 12);
      if (findCustomer) {
        const updatedCustomer = await this.customerRepo
          .update(
            {
              hashed_refresh_token,
            },
            {
              where: {
                id: findCustomer.id,
              },
              returning: true,
            },
          )
          .then((uptimedCustomer) => uptimedCustomer[1][0]);

        if (updatedCustomer) {
          return {
            message: 'User logged in successfully',
            token: refresh_token,
          };
        }
      } else {
        return {
          message: 'Login Successfully',
          token: refresh_token,
        };
      }
    }
  }
  async logout(res: Response, refresh_token: string) {
    const user = await this.jwtService.verify(refresh_token);
    if (!user) {
      throw new ForbiddenException('user not found');
    }
    const findUser = await this.customerRepo
      .update(
        {
          hashed_refresh_token: null,
        },
        {
          where: {
            id: user.id,
          },
          returning: true,
        },
      )
      .then((updatedCustomer) => updatedCustomer[1][0]);
    if (findUser) {
      res.clearCookie('refresh_token');
      return {
        message: 'User logged out successfully',
      };
    }
  }
}
