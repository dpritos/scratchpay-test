import { expect } from 'chai';
import * as sinon from 'sinon';

// to test
import { ClinicService } from '../../src/services';

// to stub
import { DentalClinic, VetClinic } from '../../src/repositories';

// tools
import { CLINIC_TYPE } from '../../src/contants';
import { stubLogger } from '../common';

describe('services/clinic', () => {
  let sandbox: sinon.SinonSandbox;
  let clinicService: ClinicService;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    stubLogger(sandbox);

    clinicService = new ClinicService();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('listClinics', () => {
    it('should be able to list clinics', async () => {
      sandbox.stub(DentalClinic.prototype, 'list').resolves([
        {
          name: 'Good Health Home',
          state: 'Alaska',
          type: CLINIC_TYPE.DENTAL,
          availability: {
            from: '10:00',
            to: '19:30'
          }
        }
      ]);
      sandbox.stub(VetClinic.prototype, 'list').resolves([
        {
          name: 'National Veterinary Clinic',
          state: 'CA',
          type: CLINIC_TYPE.VET,
          availability: {
            from: '15:00',
            to: '22:30'
          }
        }
      ]);
      const clinics = await clinicService.listClinics({});
      expect(clinics).to.be.deep.equal([
        { name: 'Good Health Home', state: 'Alaska', type: 'DENTAL', availability: { from: '10:00', to: '19:30' } },
        { name: 'National Veterinary Clinic', state: 'CA', type: 'VET', availability: { from: '15:00', to: '22:30' } }
      ]);
    });

    it('should be able to list clinics with filters', async () => {
      const dentalListStub = sandbox.stub(DentalClinic.prototype, 'list').resolves([
        {
          name: 'Good Health Home',
          state: 'CA',
          type: CLINIC_TYPE.DENTAL,
          availability: {
            from: '10:00',
            to: '19:30'
          }
        }
      ]);
      const vetListStub = sandbox.stub(VetClinic.prototype, 'list').resolves([
        {
          name: 'National Veterinary Clinic',
          state: 'CA',
          type: CLINIC_TYPE.VET,
          availability: {
            from: '15:00',
            to: '22:30'
          }
        }
      ]);

      const filter = { state: 'CA', from: '10:00', to: '23: 00' };
      const clinics = await clinicService.listClinics(filter);

      expect(dentalListStub.calledOnceWith(filter)).to.be.true;
      expect(vetListStub.calledOnceWith(filter)).to.be.true;
      expect(clinics).to.be.deep.equal([
        { name: 'Good Health Home', state: 'CA', type: 'DENTAL', availability: { from: '10:00', to: '19:30' } },
        { name: 'National Veterinary Clinic', state: 'CA', type: 'VET', availability: { from: '15:00', to: '22:30' } }
      ]);
    });
  });
});
