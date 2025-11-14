export interface ApiLoginResponse {
  success: boolean;
  message: string;
  data?: UserData;
  token?: string;
}

export interface UserData {
  user_id: number;
  username: string;
  email: string;
  name: string;
  photo: string;
  phone_number: string;
  type: 'B2C' | 'Agent' | 'Supplier' | string;
  nationality: string;
  date_of_birth: string;
  gender: string;
  account_status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | string;
  is_2fa_on: boolean;
  created_at: string;
}
