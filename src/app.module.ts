import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { TrainersModule } from './trainers/trainers.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { CoursesModule } from './courses/courses.module';
import { PlansModule } from './plans/plans.module';
import { UserCoursesModule } from './user_courses/user_courses.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserAddressModule } from './user_address/user_address.module';
import { UserCoursePaymentModule } from './user_course_payment/user_course_payment.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: [process.env.WEB_URL],
        credentials: true,
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TrainersModule,
    CoursesModule,
    PlansModule,
    UserCoursesModule,
    UsersModule,
    AuthModule,
    UserAddressModule,
    UserCoursePaymentModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
