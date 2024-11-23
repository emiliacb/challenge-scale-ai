import React, { useEffect, useState } from "react";
import { TimelineProvider } from "@/context/timeline";
import { FileConfigClient } from "@/clients/config";

const configClient = new FileConfigClient();

interface ProvidersProps {
  children: React.ReactNode;
}

const loadConfig = async (): Promise<[number, number]> => {
  const min = await configClient.getValue<number>("timeline_min_frame");
  const max = await configClient.getValue<number>("timeline_max_frame");
  return [min, max];
};

/**
 * Providers component serves as a centralized provider wrapper for the application.
 * It combines multiple context providers to make shared state and functionality
 * available throughout the component tree.
 */
export function Providers({ children }: ProvidersProps) {
  const [minMax, setMinMax] = useState<[number, number]>([0, 50]);

  useEffect(() => {
    loadConfig().then(setMinMax);
  }, []);

  return (
    <TimelineProvider minFrame={minMax[0]} maxFrame={minMax[1]}>
      {children}
    </TimelineProvider>
  );
}
