import Axios, { AxiosInstance } from 'axios';

export abstract class IDatasource {
  abstract post<TRequest, TResponse>(path: string, object: TRequest, config?: RequestConfig): Promise<TResponse>;

  abstract patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;

  abstract put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;

  abstract get<TResponse>(path: string): Promise<TResponse>;
}

export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers: HttpHeaders;
};


export class Datasource extends IDatasource {
  protected client: AxiosInstance;

  constructor() {
    super();
    this.client = this.createAxiosClient();
  }

  private createAxiosClient(): AxiosInstance {
    return Axios.create({
      baseURL: process.env.DATABASE_URL,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10 * 1000,
    });
  }

  async post<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.post<TResponse>(path, payload, config);
    return response.data;
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.patch<TResponse>(path, payload, config);
    return response.data;
  }

  async put<TRequest, TResponse>(path: string, payload: TRequest, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.put<TResponse>(path, payload, config);
    return response.data;
  }

  async get<TResponse>(path: string, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.get<TResponse>(path, config);
    return response.data;
  }
}
