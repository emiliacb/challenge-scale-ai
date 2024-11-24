import React from "react";
import Home from "./home";

/**
 * Root pages component that can be extended to include routing in the future.
 * Currently renders the Home page directly, but can be modified to handle
 * different routes and render different pages based on the current route.
 */
export default function Pages() {
  return <Home />;
}
