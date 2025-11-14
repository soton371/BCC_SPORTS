export interface IUserCreatedResponse<T> {
  success: boolean;
  message: string;
  data: T;
  token: string;
}
