import { Clinic, RepositoryContract } from '../contracts';

export default class DentalClinic implements RepositoryContract {
  async list(): Promise<Clinic[]> {
    return [];
  }
}
