import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { jwtService } from '../jwt/jwt.service';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../admin/models/admin.model';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: jwtService,
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' && !token) {
      throw new UnauthorizedException('No token provided');
    }
    let user: any;
    try {
      user = await this.jwtService.verify(token);
      const findAdmin = await this.adminRepo.findByPk(user.id, {
        include: {
          all: true,
        },
      });
      const [role] = findAdmin.roles;
      const roleName = role?.dataValues.name;
      if (roleName === 'SUPERADMIN') {
        return true;
      }
      if (roleName === 'ADMIN') {
        return true;
      }
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
    } catch (error) {
      if (error.message === 'Access Denied') {
        throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
