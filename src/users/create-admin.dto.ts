import { Role } from "src/enums/role.enum";

export class CreateAdminDto {
    name: string;
    email: string;
    password: string;
    confirmationPassword: string;
    username: string;
    phone: string;
    roles: Role[] = [Role.Admin];
}