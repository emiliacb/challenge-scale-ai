/**
 * ConfigClient provides an abstraction for accessing configuration values.
 * This interface allows for flexible configuration management by enabling different implementations,
 * such as:
 * - File-based configuration (local development)
 * - Remote configuration services
 * - Environment variables
 * - Feature flags services
 * - Database-stored configurations
 *
 * By using this interface, the application can easily switch between different configuration sources
 * without modifying the consuming code. This is particularly useful when transitioning from
 * local development to production environments or when implementing feature flags and remote config
 * management.
 */

export interface ConfigClient {
  /**
   * Gets a specific configuration value by key
   * @param key The configuration key to retrieve
   * @returns A Promise resolving to the configuration value
   */
  getValue<T>(key: string): Promise<T>;
}
