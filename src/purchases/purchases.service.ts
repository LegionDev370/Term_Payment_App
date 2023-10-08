import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Purchases } from './models/purchase.model';
import { Product } from '../product/models/product.model';
import { PurchasesWrapper } from '../purchases-wrapper/models/purchases-wrapper.model';
import { History } from '../history/models/history.model';
import { PayPurchaseDto } from './dto/pay-purchase.dto';
import { Sequelize } from 'sequelize';
@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(Purchases) private readonly purchasesRepo: typeof Purchases,
    @InjectModel(Product) private readonly productRepo: typeof Product,
    @InjectModel(PurchasesWrapper)
    private readonly purchasesWrapperRepo: typeof PurchasesWrapper,
    @InjectModel(History) private readonly historyRepo: typeof History,
  ) {}
  async create(createPurchaseDto: CreatePurchaseDto) {
    const findProduct = await this.productRepo.findByPk(
      createPurchaseDto.product_id,
    );
    const amount =
      findProduct.price +
      (findProduct.price * createPurchaseDto.interestRate) / 100;

    const date = new Date();
    const newPurchase = await this.purchasesRepo.create({
      purchase_date: date,
      total_amount: amount,
      interestRate: createPurchaseDto.interestRate,
      installmentDuration: createPurchaseDto.installmentDuration,
    });
    const res = {
      customer_id: createPurchaseDto.customer_id,
      product_id: createPurchaseDto.product_id,
      admin_id: createPurchaseDto.admin_id,
      purchases_id: newPurchase.id,
    };
    await this.purchasesWrapperRepo.create(res);
    if (newPurchase) {
      return {
        message: 'Purchase created successfully',
        data: newPurchase,
      };
    }
  }
  async findAll() {
    const purchases = await this.purchasesRepo.findAll({
      include: {
        all: true,
      },
    });
    if (purchases.length >= 1) {
      return {
        message: 'Purchase found successfully',
        data: purchases,
      };
    }
  }

  async findOne(id: number) {
    const purchase = await this.purchasesRepo.findByPk(id, {
      include: {
        all: true,
      },
    });
    if (purchase) {
      return {
        message: 'Purchase found successfully',
        data: purchase,
      };
    } else {
      throw new HttpException('Purchase not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    const updatedPurchase = await this.purchasesRepo
      .update(updatePurchaseDto, {
        where: {
          id,
        },
        returning: true,
      })
      .then((res) => res[1][0]);
    const purchase = await this.purchasesRepo.findByPk(updatedPurchase.id, {
      include: {
        all: true,
      },
    });
    if (updatedPurchase) {
      return {
        message: 'Purchase updated successfully',
        data: purchase,
      };
    }
    throw new HttpException('Purchase not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const data = await this.purchasesRepo.destroy({
      where: {
        id,
      },
    });
    if (data) {
      return {
        message: 'Purchase deleted successfully',
      };
    } else {
      throw new HttpException('Purchase not found', HttpStatus.NOT_FOUND);
    }
  }
  async payPurchase(payPurchaseDto: PayPurchaseDto) {
    const data = await this.historyRepo.create({
      paying_date: new Date(),
      payment_method: payPurchaseDto.payment_method,
      amount: payPurchaseDto.amount,
      purchases_id: payPurchaseDto.purchase_id,
    });
    if (data) {
      const findPurchase = await this.purchasesRepo.findByPk(
        payPurchaseDto.purchase_id,
      );
      const [result] = await this.historyRepo.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'],
        ],
        where: {
          purchases_id: data.purchases_id,
        },
      });
      const totalAmount = +result.dataValues['totalAmount'];
      if (totalAmount == findPurchase.dataValues['total_amount']) {
        await this.purchasesRepo
          .update(
            {
              is_paid: true,
            },
            {
              where: {
                id: data.purchases_id,
              },
              returning: true,
            },
          )
          .then((res) => res[1][0]);
      }
      return {
        message: 'Success',
      };
    }
  }
  async findAllHistories() {
    const histories = await this.historyRepo.findAll();
    console.log('ss');
    if (histories.length >= 1) {
      return {
        message: 'Histories found successfully',
        data: histories,
      };
    }
  }
}
