export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  userRole: string;
  userInvitations: string[];
  isAlreadyConnected: boolean;
  firstName: string;
  lastName: string;
}
