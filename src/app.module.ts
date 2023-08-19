import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
