import React from "react";
import { TimelineProvider } from "@/context/timeline";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TimelineProvider minFrame={0} maxFrame={50}>
      {children}
    </TimelineProvider>
  );
}
