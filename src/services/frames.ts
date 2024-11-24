import { Buffer } from "buffer";

import { RequestClient } from "@/interfaces/request-client";
import { FileConfigClient } from "@/clients/config";

const configClient = new FileConfigClient();

const cache = new Map<number, any>();

export default class FramesService {
  /**
   * This method fetches the asset data in JSON format from the server.
   * It's a temporary implementation to test and validate the use of JSON for asset data transfer.
   * In a future optimization, we'll properly implement binary serialization/deserialization
   * to improve performance and reduce bandwidth usage.
   */
  static async get(frameIndex: number, requestClient: RequestClient) {
    if (cache.has(frameIndex)) {
      return cache.get(frameIndex);
    }

    const framesBaseUrl = await configClient.getValue("frames_base_url");
    // TODO - There is be a better way to handle frame id formatting
    const frameId = frameIndex < 10 ? `0${frameIndex}` : frameIndex.toString();
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

    cache.set(frameIndex, { points, cuboids });
    return { points, cuboids };
  }
  static async loadAll(
    minFrame: number,
    maxFrame: number,
    requestClient: RequestClient
  ) {
    for (let i = minFrame; i <= maxFrame; i++) {
      await FramesService.get(i, requestClient);
    }
  }
}
