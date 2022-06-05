import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// ref: https://docs.nestjs.com/security/authentication
// Passing the strategy name directly to the AuthGuard() introduces magic strings in the codebase. Instead, we recommend creating your own class, as shown below: 
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}