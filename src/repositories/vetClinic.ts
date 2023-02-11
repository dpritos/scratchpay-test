import { Clinic, RepositoryContract } from '../contracts';

export default class VetClinic implements RepositoryContract {
  async list(): Promise<Clinic[]> {
    return [];
  }
}
