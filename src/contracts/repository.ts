export interface RepositoryContract {
  /**
   * Get list of data
   * @param filter
   */
  list(filter?: Record<string, string>): Promise<any>;
}
