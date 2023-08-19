import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
// import { Request } from 'express';  this is for access the req from express

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  // signup(@Req() req:Request) {  this is for access the req from express
  signup(@Body() dto: AuthDto) {
    debugger
    return this.authService.signup()
  }

  @Post('signin')
  signin() {
    return this.authService.signin()
  }
}