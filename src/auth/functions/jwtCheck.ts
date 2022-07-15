import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

export const jwtCheck = async (
  token: any,
  prisma: PrismaClient,
  context: any,
  jwt: JwtService,
) => {
  const accessToken = token.access_token;
  const refreshToken = token.refresh_token;
  if (accessToken) {
    try {
      const user = await jwt.verify(accessToken, {
        secret: process.env.ACCESS_TOKEN,
      });
      return user;
    } catch (error) {
      if (refreshToken) {
        const isValid = await jwt.verify(refreshToken, {
          secret: process.env.REFRESH_TOKEN,
        });
        const email = isValid.email;
        const id = isValid.user_id;
        const first_name = isValid.name;
        const last_name = isValid.name;
        const data = await prisma.users.findUnique({
          where: { user_id: id },
          select: {
            hashedRt: true,
          },
        });
        const refreshTokenDb = data.hashedRt;
        if (refreshToken == refreshTokenDb) {
          const newAccessToken = await jwt.sign(
            {
              first_name,
              last_name,
              email,
              user_id: id,
            },
            { secret: process.env.ACCESS_TOKEN, expiresIn: '1h' },
          );
          await context.res.cookie('access_token', newAccessToken, {
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
          });
          return isValid;
        } else {
          return null;
        }
      }
      return null;
    }
  } else {
    try {
      if (refreshToken) {
        const isValid = await jwt.verify(refreshToken, {
          secret: process.env.REFRESH_TOKEN,
        });
        const email = isValid.email;
        const id = isValid.user_id;
        const first_name = isValid.name;
        const last_name = isValid.name;
        const data = await prisma.users.findUnique({
          where: { user_id: id },
          select: {
            hashedRt: true,
          },
        });
        const refreshTokenDb = data.hashedRt;
        if (refreshToken == refreshTokenDb) {
          const newAccessToken = await jwt.sign(
            {
              first_name,
              last_name,
              email,
              user_id: id,
            },
            { secret: process.env.ACCESS_TOKEN, expiresIn: '1h' },
          );
          await context.res.cookie('access_token', newAccessToken, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
          });
          return isValid;
        } else {
          return null;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
