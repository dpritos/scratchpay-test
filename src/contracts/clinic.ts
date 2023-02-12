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
  state?: string;
  from?: string;
  to?: string;
}

export interface DentalClinicData {
  name: string;
  stateName: string;
  availability: ClinicAvailability;
  [key: string]: any;
}

export interface VetClinicData {
  clinicName: string;
  stateCode: string;
  opening: ClinicAvailability;
  [key: string]: any;
}
