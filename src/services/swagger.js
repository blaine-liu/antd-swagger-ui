import request from '../utils/request';

export async function fetch(){
  return request('https://petstore.swagger.io/v2/swagger.json');
}
