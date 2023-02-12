import { CLINIC_TYPE } from '../contants';
import { Clinic, ClinicFilter, DentalClinicData, VetClinicData } from '../contracts';
import * as utils from '../lib/utils';

export default abstract class ClinicParent {
  transformClinic(type: CLINIC_TYPE, data: DentalClinicData | VetClinicData): Clinic | undefined {
    switch (type) {
      case CLINIC_TYPE.DENTAL:
        return {
          name: data.name,
          state: data.stateName,
          type,
          availability: data.availability
        } as Clinic;
      case CLINIC_TYPE.VET:
        return {
          name: data.clinicName,
          state: data.stateCode,
          type,
          availability: data.opening
        } as Clinic;
      default:
        break;
    }
  }

  validate(clinic: Clinic, filters: ClinicFilter): boolean {
    let valid = true;

    if (filters.state) {
      valid = clinic.state === filters.state;
    }

    if (valid && (filters.from || filters.to)) {
      const clinicStart = utils.hourStringToNumber(clinic.availability.from);
      const clinicEnd = utils.hourStringToNumber(clinic.availability.to);

      const filterStart = utils.hourStringToNumber(filters.from || '00:00');
      const filterEnd = utils.hourStringToNumber(filters.to || '24:00');
      valid = clinicStart <= filterStart && clinicEnd >= filterEnd;
    }

    return valid;
  }
}
