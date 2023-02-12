import { DentalClinic, VetClinic } from '../repositories';
import { Clinic, ClinicFilter } from '../contracts';

export default class ClinicService {
  dentalClinic: DentalClinic;
  vetClinic: VetClinic;

  constructor() {
    this.dentalClinic = new DentalClinic();
    this.vetClinic = new VetClinic();
  }

  async listClinics(query: ClinicFilter = {}): Promise<Clinic[]> {
    const [dentalClinics, vetClinics] = await Promise.all([this.dentalClinic.list(query), this.vetClinic.list(query)]);
    return [...dentalClinics, ...vetClinics];
  }
}
