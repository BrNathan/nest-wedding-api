export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  userGroup: string;
  userInvitations: string[];
  isAlreadyConnected: boolean;
  firstName: string;
  lastName: string;
}
