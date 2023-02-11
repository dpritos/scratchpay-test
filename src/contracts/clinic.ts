import { CLINIC_TYPE } from '../contants';
export interface Clinic {
  name: string;
  state: string;
  type: CLINIC_TYPE;
  availability: ClinicAvailability;
}

export interface ClinicAvailability {
  from: string;
  to: string;
}

export interface ClinicFilter {
  name?: string;
  state?: string;
  from?: string;
  to?: string;
}
