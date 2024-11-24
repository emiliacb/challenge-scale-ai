import React, { Suspense, lazy } from "react";

import Spinner from "@/components/spinner";
import Timeline from "@/components/timeline";

const Scene = lazy(() => import("@/components/scene"));

import "./styles.css";

/**
 * This component represents the home page of the application.
 * While it's placed in a "pages" directory, this is not using any routing framework.
 * The pages directory structure is maintained to make future routing integration easier if needed.
 */
export default function Home() {
  return (
    <main>
      <div className="home_container">
        <div className="home_scene">
          <Suspense fallback={<Spinner />}>
            <Scene />
          </Suspense>
        </div>
        <Timeline />
      </div>
    </main>
  );
}
