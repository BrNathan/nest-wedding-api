export class AddUserDto {
  username: string;
  email?: string;
  password: string;
  firstName: string;
  lastName: string;
  isAlreadyConnected?: boolean;
  roleId: number;
}
