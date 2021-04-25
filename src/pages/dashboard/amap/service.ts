import request from '@/utils/request';


export async function queryFilePage(data: any) {
  return request(`/api/file/page/`, {
    method: 'POST',
    data
  });
} 


