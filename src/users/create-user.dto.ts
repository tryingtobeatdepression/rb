import { Role } from "src/enums/role.enum";

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    confirmationPassword: string;
    username: string;
    phone: string;
    roles: Role[] = [Role.User];
}