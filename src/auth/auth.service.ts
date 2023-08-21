import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import argon from 'argon2'  this way is not ok

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
    ) { }

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password)

    try {
      //save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        },
        // select: {    this is one way, but other is with delete
        //   id: true,
        //   email: true,
        //   createdAt: true
        // }
      })

      delete user.hash
      // return the saved user
      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials are already taken')
        }
      }

      throw error
    }
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Incorrect credentials')

    // compare passwords
    const pwMatches = await argon.verify(user.hash, dto.password)
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Incorrect credentials')

    return this.signToken(user.id, user.email)
  }

  async signToken(userId: number, email: string):Promise<{access_token: string}> {
    const payload = {
      sub: userId,
      email
    }
    const secret = this.config.get('JWT_SECRET')

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret
    })

    return {
      access_token: token
    }
  }
}