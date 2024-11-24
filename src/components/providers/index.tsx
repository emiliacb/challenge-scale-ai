import React from "react";
import { TimelineProvider } from "@/lib/context/timeline";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Providers component serves as a centralized provider wrapper for the application.
 * It combines multiple context providers to make shared state and functionality
 * available throughout the component tree.
 */
export default function Providers({ children }: ProvidersProps) {
  return <TimelineProvider>{children}</TimelineProvider>;
}
