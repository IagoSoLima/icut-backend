import { UserPayload } from '~/common/interfaces';

export interface SignInResponse extends UserPayload {
  accessToken: string;
}
