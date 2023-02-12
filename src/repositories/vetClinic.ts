import * as https from 'https';
import * as JSONStream from 'JSONStream';

import * as config from '../config';
import { Clinic, ClinicFilter, DentalClinicData, RepositoryContract } from '../contracts';
import { CLINIC_TYPE } from '../contants';
import { ClinicParent } from '../entities';

export default class VetClinic extends ClinicParent implements RepositoryContract {
  sourceUrl = config.VET_CLINIC_SOURCE;

  async list(filters: ClinicFilter = {}): Promise<Clinic[]> {
    return new Promise((resolve, reject) => {
      const clinics: Clinic[] = [];

      /**
       * Use stream to fetch clinic and parse and validate one by one on the fly
       */
      https
        .get(this.sourceUrl, (res) => {
          res.pipe(JSONStream.parse('*')).on('data', (data: DentalClinicData) => {
            const clinic = this.transformClinic(CLINIC_TYPE.VET, data);

            if (clinic && this.validate(clinic, filters)) {
              clinics.push(clinic);
            }
          });

          res.on('end', () => {
            resolve(clinics);
          });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
