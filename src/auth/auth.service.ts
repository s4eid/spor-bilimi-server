import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput } from './dto/register.input';
import { PrismaService } from 'prisma/prisma.service';
import { ApolloError } from 'apollo-server-errors';
import { hash, compare } from 'bcrypt';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const passwordIsRight = await compare(password, user.password);
      if (passwordIsRight) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(context, token: string) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await this.httpService.axiosRef.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    );
    if (!response.data.success) {
      return new ApolloError('Login Failed!');
    }
    const user = context.user;
    const access_token = this.jwtService.sign(
      {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_id: user.user_id,
      },
      { expiresIn: '1h', secret: process.env.ACCESS_TOKEN },
    );
    const refresh_token = this.jwtService.sign(
      {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_id: user.user_id,
      },
      { expiresIn: '1d', secret: process.env.REFRESH_TOKEN },
    );
    await this.prisma.users.update({
      where: { user_id: user.user_id },
      data: {
        hashedRt: refresh_token,
      },
    });
    context.res.cookie('access_token', access_token, {
      secure: process.env.NODE_ENV === 'production',
      // domain:
      //   process.env.NODE_ENV === 'development'
      //     ? '.localhost'
      //     : '.sb-p.vercel.app',
      // path: '/',
      // sameSite: "lax",
      domain: process.env.COOKIE_DOMAIN,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : '',
      // sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
      // maxAge: 60 * 60 * 60,
    });
    context.res.cookie('refresh_token', refresh_token, {
      secure: process.env.NODE_ENV === 'production',
      // path: '',
      // sameSite: "lax",
      // sameSite: 'lax',
      domain: process.env.COOKIE_DOMAIN,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : '',
      maxAge: 1000 * 60 * 60 * 24,
    });
    return {
      user: context.user,
      access_token: access_token,
    };
  }
  async register(registerInput: RegisterInput) {
    const exist = await this.usersService.findOne(registerInput.email);
    if (exist) {
      return new ApolloError('Register Faild!');
    }
    const hashedPass = await hash(registerInput.password, 10);
    const user = await this.prisma.users.create({
      data: {
        email: registerInput.email,
        first_name: registerInput.first_name,
        last_name: registerInput.last_name,
        password: hashedPass,
      },
    });

    return {
      user: user,
      access_token: this.jwtService.sign({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_id: user.user_id,
      }),
    };
  }
}
