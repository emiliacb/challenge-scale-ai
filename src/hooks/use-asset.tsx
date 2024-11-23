import React from "react";
import { useState, useEffect } from "react";

import { AssetsService } from "@/services/assets";
import { RequestClient } from "@/clients/request-client";
import { AssetData } from "@/types/assets";

const requestClient = new RequestClient();

/**
 * A React hook that fetches and manages asset data for a given frame ID.
 *
 * This hook handles the loading state and data fetching for frame assets,
 * abstracting away the complexity of making API calls and managing state.
 *
 * @param {Object} params - The parameters object
 * @param {string} params.frameId - The unique identifier for the frame to fetch
 * @returns {Object} An object containing:
 *   - data: The fetched asset data (points and cuboids) or null if not loaded
 *   - isLoading: Boolean indicating if the data is currently being fetched
 *
 * @example
 * ```tsx
 * function MyComponent({ frameId }) {
 *   const { data, isLoading } = useAsset({ frameId });
 *
 *   if (isLoading) return <Spinner />;
 *   if (!data) return null;
 *
 *   return <Scene points={data.points} cuboids={data.cuboids} />;
 * }
 * ```
 */
export default function useAsset({ frameId }: { frameId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AssetData | null>(null);

  const fetchAssetData = async (frameId: string) => {
    try {
      const data = await AssetsService.fetchJson(frameId, requestClient);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load buffer:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssetData(frameId);
  }, []);

  return { data, isLoading };
}
