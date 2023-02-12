import { expect } from 'chai';
import * as sinon from 'sinon';

// to stub
import * as https from 'https';

// to test
import { VetClinic } from '../../src/repositories';

// tools
import { stubLogger, mockStream } from '../common';

describe('repositories/vetClinic', () => {
  let sandbox: sinon.SinonSandbox;
  let vetClinic: VetClinic;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    stubLogger(sandbox);

    vetClinic = new VetClinic();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('list', () => {
    it('should be able to fetch and transform dental clinics', async () => {
      const mockStreamFunction = mockStream(`${__dirname}/mockVetClinic.json`);
      sandbox.stub(https, 'get').callsFake(mockStreamFunction);

      const clinics = await vetClinic.list({});
      expect(clinics).to.be.deep.equal([
        { name: 'Good Health Home', state: 'FL', type: 'VET', availability: { from: '15:00', to: '20:00' } },
        { name: 'National Veterinary Clinic', state: 'CA', type: 'VET', availability: { from: '15:00', to: '22:30' } },
        { name: 'German Pets Clinics', state: 'KS', type: 'VET', availability: { from: '08:00', to: '20:00' } },
        { name: 'City Vet Clinic', state: 'NV', type: 'VET', availability: { from: '10:00', to: '22:00' } },
        {
          name: 'Scratchpay Test Pet Medical Center',
          state: 'CA',
          type: 'VET',
          availability: { from: '00:00', to: '24:00' }
        }
      ]);
    });

    it('should be able to fetch and transform dental clinics with filters', async () => {
      const mockStreamFunction = mockStream(`${__dirname}/mockVetClinic.json`);
      sandbox.stub(https, 'get').callsFake(mockStreamFunction);

      const clinics = await vetClinic.list({
        state: 'CA',
        from: '15:00',
        to: '22:30'
      });

      expect(clinics).to.be.deep.equal([
        { name: 'National Veterinary Clinic', state: 'CA', type: 'VET', availability: { from: '15:00', to: '22:30' } }
      ]);
    });
  });
});
