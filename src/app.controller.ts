import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    // ✅ WORKING
    // AuthGuard invokes the Passport strategy and kicks off the steps described above (retrieving credentials, running the verify function, creating the user property, etc).
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        // This route handler will only be called if the user has been validated.
        // The req parameter will contain user property populated by Passport during the passport-local authentication flow.
        // return req.user;
        // ##IMPORTANT: req.user is only added on this particular request.
        return this.authService.login(req.user);
    }

    // ✅
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
