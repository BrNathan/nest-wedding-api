import { Role } from 'src/role/entity/role.entity';

export interface AddNewUserDto {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  invitations: string[];
}
