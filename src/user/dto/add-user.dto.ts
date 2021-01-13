export class AddUserDto {
  username: string;
  email?: string;
  password: string;
  firstName: string;
  lastName: string;
  isAlreadyConnected?: boolean;
  roleId: number;

  // @hasMany(() => Guest)
  // guests?: Guest[];

  // @hasMany(() => Invitation, {
  //   through: {
  //     model: () => UserInvitation,
  //     keyFrom: 'userId',
  //     keyTo: 'invitationId'
  //   }
  // })
  // invitations?: Invitation[];
}
