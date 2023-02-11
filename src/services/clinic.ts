import { DentalClinic, VetClinic } from '../repositories';
import { Clinic } from '../contracts';

export default class ClinicService {
  dentalClinic: DentalClinic;
  vetClinic: VetClinic;

  constructor() {
    this.dentalClinic = new DentalClinic();
    this.vetClinic = new VetClinic();
  }

  async listClinics(query?: any): Promise<Clinic[]> {
    return [];
  }
}
