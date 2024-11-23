import { Buffer } from "buffer";

import { RequestClient } from "@/interfaces/request-client";
import { FileConfigClient } from "@/clients/config-client";

const configClient = new FileConfigClient();

export class AssetsService {
  /**
   * This method is a temporary implementation to test and validate the use of binary buffers
   * for asset data transfer. It serves as a proof of concept for future optimizations
   * where we'll properly implement binary serialization/deserialization to improve
   * performance and reduce bandwidth usage.
   */
  static async fetchBuffer(frameId: string, requestClient: RequestClient) {
    const framesBaseUrl = await configClient.getValue("frames_base_url");
    const url = `${framesBaseUrl}/frame_${frameId}.json`;
    const response = await requestClient.fetch(url, { method: "GET" });

    if (!response.ok) {
      // TODO - Add error types and error handling
      throw new Error(`Failed to fetch asset: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  }

  /**
   * This method fetches the asset data in JSON format from the server.
   * It's a temporary implementation to test and validate the use of JSON for asset data transfer.
   * In a future optimization, we'll properly implement binary serialization/deserialization
   * to improve performance and reduce bandwidth usage.
   */
  static async fetchJson(frameId: string, requestClient: RequestClient) {
    const framesBaseUrl = await configClient.getValue("frames_base_url");
    const url = `${framesBaseUrl}/frame_${frameId}.json`;
    const response = await requestClient.fetch(url, { method: "GET" });

    if (!response.ok) {
      // TODO - Add error types and error handling
      throw new Error(`Failed to fetch asset: ${response.statusText}`);
    }

    const json = await response.json();
    // TODO - Transform the points, including the color by z
    const points = new Float32Array(json.points.flat());
    // TODO - Transform the cuboids with the format to be used in the scene
    const cuboids = json.cuboids;

    return { points, cuboids };
  }
}
