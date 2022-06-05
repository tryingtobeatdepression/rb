import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]> (ROLES_KEY, [
            context.getHandler(), 
            context.getClass()
        ]);
        if(!requiredRoles)
            return true;
        const { user } = context.switchToHttp().getRequest();
        // .some(): Whether at least one element in the array 
        // passes the test implemented by the provided function.
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}