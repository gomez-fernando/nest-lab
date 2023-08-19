import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // we create a global module in order to not import it in each module
  // imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}