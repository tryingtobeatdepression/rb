import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    /**
     * This method is to be used within LocalStrategy settings to 
     * validate User.
     * @param username 
     * @param password 
     * @returns 
     */
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === password) {
            // FIXME: There is a problem in 'result'
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * @publicAPI
     * @param user 
     * @returns 
     */
    async login(user: any) {
        // Note: we choose a property name of sub to hold our userId value to be consistent with JWT standards. 
        // { sub: user.userId }
        const payload = {
            username: user.username,
            email: user.email,
            _id: user._id,
        };
        return { access_token: this.jwtService.sign(payload), };
    }
}
