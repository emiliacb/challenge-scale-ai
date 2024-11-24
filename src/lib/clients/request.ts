import {
  RequestClient as RequestClientInterface,
  RequestOptions,
} from "@/lib/interfaces/request-client";

/**
 * RequestClient implements the RequestClientInterface to provide a wrapper around
 * the browser's native fetch API for making HTTP requests.
 *
 * This implementation provides a standardized way to make HTTP requests while
 * allowing for future extensibility and testing by abstracting the actual
 * request mechanism.
 */
export class RequestClient implements RequestClientInterface {
  async fetch(url: string, options?: RequestOptions) {
    return fetch(url, options);
  }
}
