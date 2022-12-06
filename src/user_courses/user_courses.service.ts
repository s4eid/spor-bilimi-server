import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserCourseInput } from './dto/create-user_course.input';
import { UserAddressService } from 'src/user_address/user_address.service';
import { UpdateUserCourseInput } from './dto/update-user_course.input';
import { UserCoursePaymentService } from 'src/user_course_payment/user_course_payment.service';
import * as Iyzipay from 'iyzipay';
import { CoursesService } from 'src/courses/courses.service';
import { PlansService } from 'src/plans/plans.service';
import { UsersService } from 'src/users/users.service';
import client from '../../config/sendgrid';
import { CreateMembershipInput } from './dto/create-membership-input';

@Injectable()
export class UserCoursesService {
  constructor(
    private prisma: PrismaService,
    private coursesService: CoursesService,
    private userAddressService: UserAddressService,
    private userCoursePaymentService: UserCoursePaymentService,
    private userService: UsersService,
    private planService: PlansService,
  ) {}
  async create(createUserCourseInput: CreateUserCourseInput) {
    const plan = await this.planService.findOne(createUserCourseInput.plan_id);
    const course = await this.coursesService.findOne(
      createUserCourseInput.course_id,
    );
    const user = await this.userService.findOneWithId(
      createUserCourseInput.user_id,
    );
    var iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY,
      secretKey: process.env.IYZICO_SECRET_KEY,
      uri: process.env.IYZICO_URI,
    });

    var request = {
      locale: Iyzipay.LOCALE.EN,
      // conversationId: '123456789',
      price: plan.price,
      paidPrice: plan.price,
      currency: Iyzipay.CURRENCY.TRY,
      installment: '1',
      // basketId: 'B67832',
      // paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      // paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      paymentCard: {
        cardHolderName: createUserCourseInput.owner,
        cardNumber: createUserCourseInput.card_number,
        expireMonth: createUserCourseInput.expire_m,
        expireYear: createUserCourseInput.expire_y,
        cvc: createUserCourseInput.cvv,
        registerCard: '0',
      },
      buyer: {
        id: createUserCourseInput.user_id,
        name: user.first_name,
        surname: user.last_name,
        gsmNumber: createUserCourseInput.phone_number,
        email: user.email,
        identityNumber: user.user_id,
        // lastLoginDate: '2015-10-05 12:43:35',
        // registrationDate: '2013-04-21 15:12:09',
        registrationAddress: createUserCourseInput.address,
        ip: '54556',
        city: createUserCourseInput.city,
        country: 'Turkey',
        zipCode: createUserCourseInput.zip_code,
      },
      shippingAddress: {
        contactName: user.first_name + ' ' + user.last_name,
        city: createUserCourseInput.city,
        country: 'Turkey',
        address: createUserCourseInput.address,
        zipCode: createUserCourseInput.zip_code,
      },
      billingAddress: {
        contactName: user.first_name + ' ' + user.last_name,
        city: createUserCourseInput.city,
        country: 'Turkey',
        address: createUserCourseInput.address,
        zipCode: createUserCourseInput.zip_code,
      },
      // basketItems: cart_items,
      basketItems: [
        {
          id: course.course_id,
          name: course.name,
          category1: course.category,
          // category2: ,
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: plan.price,
        },
      ],
    };
    let iyzicoPayment = new Promise(async (resolve, reject) => {
      await iyzipay.payment.create(request, async function (err, result) {
        console.log(result);
        if (result.status === 'failure') {
          return;
        }
        resolve(result);
      });
    });
    iyzicoPayment.then(async (result: any) => {
      const userCourseAndPayment = await this.prisma.user_courses.create({
        data: {
          course_id: createUserCourseInput.course_id,
          plan_id: createUserCourseInput.plan_id,
          quiz: createUserCourseInput.quiz,
          user_id: createUserCourseInput.user_id,
          time: createUserCourseInput.time,
          user_course_payment: {
            create: {
              iyzico_commission_fee: result.iyziCommissionFee,
              iyzico_payment_id: result.paymentId,
              paid_price: result.paidPrice,
              price: result.price,
            },
          },
        },
      });
      const addressExist = await this.userAddressService.findOneWithUserId(
        user.user_id,
      );
      if (!addressExist) {
        await this.userAddressService.create({
          user_id: createUserCourseInput.user_id,
          address: createUserCourseInput.address,
          city: createUserCourseInput.city,
          phone_number: createUserCourseInput.phone_number,
          zip_code: createUserCourseInput.zip_code,
        });
        return { status: 'success' };
      }
      return { status: 'success' };
    });
  }
  async createMembership(createMembership: CreateMembershipInput) {
    const memberStr = JSON.stringify(createMembership.quiz);
    // const time = JSON.stringify(createMembership.time);
    const message = {
      to: [
        'saeid.savage@gmail.com',
        'saeid@step-agent.com',
        'frkaksan@gmail.com',
      ],
      from: {
        email: 'saeid.noormohammad@gmail.com',
        name: 'saeid noormohammad',
      },
      subject: 'Yeni Uye Bilgileri',
      html: `
      <h3>
   Yeni Uye Bilgileri:
      </h3>
      <br>
     <p>${memberStr}</p>
      <br>
      `,
    };

    // <h4>Zoomda Gorusme Zamani</h4>
    // <p>${time}</p>
    await client.send(message);
    return { status: true };
  }

  findAll() {
    return `This action returns all userCourses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCourse`;
  }

  update(id: number, updateUserCourseInput: UpdateUserCourseInput) {
    return `This action updates a #${id} userCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCourse`;
  }
}
