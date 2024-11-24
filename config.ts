/**
 * This configuration file exists separately from the src directory because the application
 * is designed to be independent of the configuration system.
 * The FileConfigClient in src/clients/config.ts is utilizing this file, but we can easily
 * swap it out for a different implementation. (e.g., AWS Parameter Store/Systems Manager)
 */
export default {
  frames_base_url: "https://static.scale.com/uploads/pandaset-challenge",
  timeline_min_frame: 0,
  timeline_max_frame: 49,
  timeline_fps: 10,
} as Record<string, any>;
