export type RequestOptions = {
  headers?: Record<string, string>;
  method: "GET" | "POST" | "PUT" | "DELETE";
};

export interface RequestClient {
  fetch(url: string, options: RequestOptions): Promise<Response>;
}
