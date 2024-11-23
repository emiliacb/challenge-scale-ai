import React from "react";
import { Scene } from "@/components/scene";

/**
 * This component represents the home page of the application.
 * While it's placed in a "pages" directory, this is not using any routing framework.
 * The pages directory structure is maintained to make future routing integration easier
 * if needed (e.g., when implementing Next.js or React Router).
 *
 * Currently, this serves as a simple container for the 3D visualization scene.
 */
export default function Home() {
  return (
    <main>
      <h1>3D Scene Visualization</h1>
      <Scene />
    </main>
  );
}
