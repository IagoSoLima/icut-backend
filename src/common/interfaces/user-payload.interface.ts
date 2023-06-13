import { UserType } from '../enum';

export interface UserPayload {
  id: number;
  name: string;
  lastName: string;
  email: string;
  userName: string;
  userType: UserType;
  avatarUrl: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  idEstablishment?: number;
}
