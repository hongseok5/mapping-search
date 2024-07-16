import type { NextApiRequest, NextApiResponse } from 'next';
import axios, {AxiosResponse} from 'axios';

interface Hit {
  _index: string | null;
  _type: number | null;
  _id: string | null;
  _score: number | null;
  _source: object | null;
}

interface QueryString {
  query_string: {
    fields: string[];
    query: string;
  }
}

interface Term {
  term: {
    [key: string]: string;
  };
}

interface Body {
  query: {
    bool: {
      must: (QueryString | Term)[];
    };
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {keyword, tablenm} = req.query as {keyword: string, tablenm: string  };
  console.log(keyword +  ":" + tablenm)
  try {
    let body:Body = {
      query: {
        bool: {
          must:[]
        }
      }
    }
    let query_string:QueryString = {
      query_string : {
        fields: [
           "class_name.ngram^10"
          ,"propt_name.ngram^50"
          ,"desc.ngram"
      ],
      query: keyword
      }
    }
    let term:Term = {
      term : {
        "table_name.keyword" : tablenm
      }
    }
    if(tablenm){
      body.query.bool.must.push(term)     
    }
    if(keyword){
      body.query.bool.must.push(query_string)     
    }
    console.log(body)
    const axiosResponse: AxiosResponse<any, any> =  await axios.post('http://localhost:9200/_search', body);
    console.log(axiosResponse)
    let responseData
    if(axiosResponse.data.error){
      responseData = axiosResponse.data.error
      res.status(400).json({result: false});
    } else {
      responseData = axiosResponse.data.hits.hits
      res.status(200).json(responseData.map((h: Hit) => h._source));
    }  

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}