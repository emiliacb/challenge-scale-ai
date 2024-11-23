/**
 * RequestOptions defines the configuration for making HTTP requests.
 * This type provides a standardized way to configure request parameters
 * across different implementations of the RequestClient interface.
 */
export type RequestOptions = {
  /** Optional headers to be included in the request */
  headers?: Record<string, string>;
  /** The HTTP method to be used for the request */
  method: "GET" | "POST" | "PUT" | "DELETE";
};

/**
 * RequestClient provides an abstraction for making HTTP requests.
 * This interface allows for flexible request management by enabling different implementations.
 */
export interface RequestClient {
  fetch(url: string, options: RequestOptions): Promise<Response>;
}
