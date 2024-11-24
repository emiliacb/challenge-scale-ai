import { ConfigClient } from "@/lib/interfaces/config-client";
import config from "../../../config";

/**
 * FileConfigClient implements the ConfigClient interface to provide configuration values
 * from a local file source (config.ts).
 *
 * This implementation is primarily used for local development environments where
 * configuration values are stored in a static file rather than retrieved from
 * remote services or environment variables.
 */
export class FileConfigClient implements ConfigClient {
  async getValue<T>(key: string): Promise<T> {
    const value = config[key];

    if (value === undefined) {
      throw new Error(`Configuration key not found: ${key}`);
    }

    return value as T;
  }

  async getConfig(): Promise<any> {
    return config;
  }
}
