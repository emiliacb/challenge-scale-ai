/**
 * ConfigClient provides an abstraction for accessing configuration values.
 * This interface allows for flexible configuration management by enabling different implementations.
 */
export interface ConfigClient {
  /**
   * Gets a specific configuration value by key
   * @param key The configuration key to retrieve
   * @returns A Promise resolving to the configuration value
   */
  getValue<T>(key: string): Promise<T>;
}
