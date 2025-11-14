export interface HTTPResponse<T> {
  success?: boolean;
  count?: number;
  total?: number;
  data?: T;
  token?: string;
  message?: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: IUserData;
  token: string;
}

export interface IUserData {
  id: number;
  username: string;
  name: string;
  email: string;
  two_fa: boolean;
  status: boolean;
  photo: string;
  gender: 'Male' | 'Female';
  phone_number?: string;
}

export interface IMatchOTPResponse {
  success: boolean;
  message: string;
  token: string;
  email: string;
}

export interface IMyProfileRes {
  account_status: string;
  created_at: string;
  created_by: string;
  created_by_name: string;
  email: string;
  id: number;
  is_2fa_on: boolean;
  name: string;
  phone_number: string;
  photo: string;
  username: string;
  gender: 'Male' | 'Female' | undefined;
}

export interface ITravelerForm {
  reference: string;
  first_name: string;
  last_name: string;
  type: string | undefined;
  date_of_birth: string;
  gender: 'Male' | 'Female';
  issuing_country: string;
  nationality: string;
  passport_number: string;
  passport_expiry_date: string;
  contact_number: string;
  contact_email: string;
  frequent_flyer_number?: string;
  frequent_flyer_airline?: string;
  visa_file: string | undefined | File;
  passport_file: string | undefined | File;
}
