import {
  RequestClient as RequestClientInterface,
  RequestOptions,
} from "@/interfaces/request-client";

export class RequestClient implements RequestClientInterface {
  async fetch(url: string, options?: RequestOptions) {
    return fetch(url, options);
  }
}
