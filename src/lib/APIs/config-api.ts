import { API_ENDPOINTS } from './endpoint-list';
import { fetchRequest } from './fetchApis';

export async function getSiteInfo() {
  const res = await fetchRequest<any>(API_ENDPOINTS.MATCH_OTP, {
    method: 'GET',
    next: { revalidate: 60 },
    // cache: 'no-store',
  });

  return res;
}
