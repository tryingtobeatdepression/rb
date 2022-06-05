import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // The false setting delegates the responsibility of ensuring that a JWT has not expired to the Passport module
            // This means that if our route is supplied with an expired JWT, the request will be denied and a 401 response sent. 
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return {
            email: payload.email,
            username: payload.username,
            _id: payload._id
        };
    }
}