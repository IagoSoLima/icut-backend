import { UserType } from '../enum';

export interface UserPayload {
  id: string | number;
  name: string;
  lastName: string;
  email: string;
  userName: string;
  userType: UserType;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
