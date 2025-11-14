import { auth } from '@/auth';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchRequest = async <T>(
  url: string,
  options: FetchOptions = {},
  delayMs: number = 0,
): Promise<any> => {
  const session = await auth();
  const token = /* session?.user?.token; */ '';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token ? token : ''}`,
    ...options.headers,
  };

  const config: FetchOptions = {
    ...options,
    headers,
    credentials: 'include',
  };

  if (delayMs > 0) {
    await delay(delayMs);
  }
  // console.log('🚀 API REQUEST:', `${baseURL}/${url}`);

  const response = await fetch(`${url}`, config);

  const data /* HTTPResponse<T>  */ = await response.json();

  return data;
};
