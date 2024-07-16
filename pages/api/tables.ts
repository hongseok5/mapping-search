import type { NextApiRequest, NextApiResponse } from 'next';
//import { Client } from '@elastic/elasticsearch';
import {Bucket} from '../../app/src/interface/bucket';
import axios, {AxiosResponse} from 'axios';
//const client = new Client({ node: 'http://localhost:9200' });


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const axiosResponse: AxiosResponse<any, any> =  await axios.get('http://localhost:9200/_search', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        pretty: '', // pretty 옵션을 적용하려면 빈 문자열을 전달합니다.
      },
      data: {
        aggs: {
          tables: {
            terms: { field: 'table_name.keyword', size: 10000 }
          }
        },
        size: 0
      }
    });

    console.log(); // Elasticsearch의 응답 데이터 출력
    const responseData = axiosResponse.data.aggregations.tables.buckets; // 실제 응답 데이터에 접근    
    res.status(200).json(responseData.map((b: Bucket) => b.key));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}