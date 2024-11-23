import { ConfigClient } from "../interfaces/config-client";
import config from "../../config";

export class FileConfigClient implements ConfigClient {
  async getValue<T>(key: string): Promise<T> {
    const value = config[key];

    if (value === undefined) {
      throw new Error(`Configuration key not found: ${key}`);
    }

    return value as T;
  }
}
