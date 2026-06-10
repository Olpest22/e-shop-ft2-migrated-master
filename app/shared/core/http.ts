import axios from 'axios';

export class AxiosInterceptor {
  //  @ts-expect-error environment variable may be missing
  private static readonly baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  private static readonly headers: object = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Accept-Control-Allow-Origin': "*"
  }

  public static $get = async (endpoint: string, params: object) => {
    try {
      const { data } = await axios.get(AxiosInterceptor.baseURL + endpoint, 
        {params, headers: this.headers }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)){
        console.log("[AXIOS]: ", error.message)
      } else{
        console.log("[TS]: ", error)
      }
    }
  };

  public static $post = async (endpoint: string, data: object) => {
    try {
      const { data: body } = await axios.post(AxiosInterceptor.baseURL + endpoint,
        data, { headers: this.headers });
      return body;
    } catch (error) {
      if (axios.isAxiosError(error)){
        console.log("[AXIOS]: ", error.message)
      } else{
        console.log("[TS]: ", error)
      }
    }
  };

  constructor() {
    console.log('baseurl:', AxiosInterceptor.baseURL);
  }
}

new AxiosInterceptor();
