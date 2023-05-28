export interface UserPayload {
  id: string | number;
  name: string;
  lastName: string;
  email: string;
  userName: string;
  userType: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
