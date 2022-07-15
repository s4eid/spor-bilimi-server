import { rewriteURIForGET } from '@apollo/client';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { jwtCheck } from '../functions/jwtCheck';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}
  parseCookies(request: Request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;
    cookieHeader.split(`;`).forEach(function (cookie) {
      let [name, ...rest] = cookie.split(`=`);
      name = name?.trim();
      if (!name) return;
      const value = rest.join(`=`).trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
    });
    return list;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const _ctx = ctx.getContext();
    const req: Request = _ctx.req;
    const cookies = this.parseCookies(req);
    const jwt = await jwtCheck(cookies, this.prisma, _ctx, this.jwtService);
    if (jwt) {
      return true;
    } else {
      return false;
    }
  }
}
