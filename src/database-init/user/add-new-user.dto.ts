import { Role } from 'src/role/entity/role.entity';

export interface AddNewUserDto {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: Role;
  invitations: string[];
}
