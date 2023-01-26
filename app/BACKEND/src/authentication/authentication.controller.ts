import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthenticationGuard, LocalAuthGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { SignDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from './authentication.interfaces';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  auth() {
    console.log(`authentication.controller: auth(42auth)`);
  }

  @Get('redirect')
  redirect(@Req() req: Request, @Res() res: Response) {
    console.log(`authentication.controller: redirect(signin) ---> SUCCESS`);
    return res.redirect('http://localhost:3001/signin');
  }

  @Post('signup')
  async signup(@Res() res: Response, @Body() user: SignDto) {
    const newUser = await this.authService.signUp(user);
    if (newUser) {
      console.log(
        `authentication.controller: signUp(${newUser.login}) ---> SUCCESS`,
      );
      return res.redirect('http://localhost:3001/signin');
    }
    console.log(
      `authentication.controller: signUp(${newUser.login}) ---> FAIL`,
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.send(newUser);
  }

  @Post('signin')
  async signIn(@Res() res: Response, @Body() body: SignDto) {
    const foundUser = await this.userService.findOneByLogin(body.login);
    if (foundUser) {
      const log = await this.authService.login(body);
      const cookie = this.authService.getCookieWithJwtToken(foundUser.id);
      console.log(
        `authentication.controller: signin(${foundUser.login}) access_token(${log.access_token}) ---> SUCCESS`,
      );
      res.setHeader('Set-Cookie', cookie);
      return res.redirect('http://localhost:3000/app');
    }
    console.log(`authentication.controller: signin(${body}) ---> FAIL`);
    return res.redirect('http://localhost:3001/signin');
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('status')
  status(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    console.log(
      `authentication.controller: status(${user}) JWT = ${cookie} ---> SUCCESS`,
    );
    return res.send(cookie);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('signout')
  logout(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const cookie = this.authService.getCookieForLogOut(user.id);
    res.setHeader('Set-Cookie', cookie);
    console.log(`authentication.controller: signout(${user}) JWT = ${cookie}`);
    return res.redirect('http://localhost:3001/signin');
  }
}
