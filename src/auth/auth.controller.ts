import { Body, Controller, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
// import { Request } from 'express';  this is for access the req from express

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  // signup(@Req() req:Request) {  this is for access the req from express
  signup(@Body() dto: AuthDto) {
    // signup(   to apply pipe individually
    //   @Body('email') email:string,
    //   @Body('password', ParseIntPipe) password:string
    // ) {
    
    return this.authService.signup(dto)
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto)
  }
}