import { Buffer } from "buffer";

import { RequestClient } from "@/lib/interfaces/request-client";
import { FileConfigClient } from "@/lib/clients/config";
import { getPointsColors } from "@/lib/helpers/get-points-colors";
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
    try {
      if (cache.has(frameIndex)) {
        return cache.get(frameIndex);
      }

      const framesBaseUrl = await configClient.getValue("frames_base_url");
      const frameId = frameIndex.toString().padStart(2, "0");
      const url = `${framesBaseUrl}/frame_${frameId}.json`;
      const response = await requestClient.fetch(url, { method: "GET" });

      if (!response.ok) {
        throw new Error(`Failed to fetch asset: ${response.statusText}`);
      }

      const json = await response.json();

      // We instantiate the arrays with the correct size to avoid unnecessary memory allocation
      const points = new Float32Array(json.points.length * 3);
      const colors = new Float32Array(json.points.length * 3);

      points.set(json.points.flat());
      colors.set(getPointsColors(json.points).flat());

      const cuboids = json.cuboids;

      cache.set(frameIndex, { points, cuboids, colors });
      return { points, cuboids, colors };
    } catch (error) {
      console.error("Failed to load frame:", error);
      return null;
    }
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
