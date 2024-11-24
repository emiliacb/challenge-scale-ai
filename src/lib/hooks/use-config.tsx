import { useState, useEffect } from "react";

import { FileConfigClient } from "@/lib/clients/config";

const configClient = new FileConfigClient();

type Config = {
  frames_base_url: string;
  timeline_min_frame: number;
  timeline_max_frame: number;
  timeline_fps: number;
  prefetch_frames: boolean;
};

const defaultConfig: Config = {
  frames_base_url: "",
  timeline_min_frame: 0,
  timeline_max_frame: 0,
  timeline_fps: 0,
  prefetch_frames: false,
};

/**
 * Hook to access global configuration values
 */
export default function useConfig() {
  const [configuration, setConfiguration] = useState<Config>(defaultConfig);

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await configClient.getConfig();
      setConfiguration(config);
    };
    fetchConfig();
  }, []);

  return configuration;
}
