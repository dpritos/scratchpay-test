import { expect } from 'chai';
import * as sinon from 'sinon';

// to stub
import * as https from 'https';

// to test
import { DentalClinic } from '../../src/repositories';

// tools
import { stubLogger, mockStream } from '../common';

describe('repositories/dentalClinic', () => {
  let sandbox: sinon.SinonSandbox;
  let dentalClinic: DentalClinic;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    stubLogger(sandbox);

    dentalClinic = new DentalClinic();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('list', () => {
    it('should be able to fetch and transform dental clinics', async () => {
      const mockStreamFunction = mockStream(`${__dirname}/mockDentalClinic.json`);
      sandbox.stub(https, 'get').callsFake(mockStreamFunction);

      const clinics = await dentalClinic.list({});
      expect(clinics).to.be.deep.equal([
        { name: 'Good Health Home', state: 'Alaska', type: 'DENTAL', availability: { from: '10:00', to: '19:30' } },
        { name: 'Mayo Clinic', state: 'Florida', type: 'DENTAL', availability: { from: '09:00', to: '20:00' } },
        { name: 'Cleveland Clinic', state: 'New York', type: 'DENTAL', availability: { from: '11:00', to: '22:00' } },
        {
          name: 'Hopkins Hospital Baltimore',
          state: 'Florida',
          type: 'DENTAL',
          availability: { from: '07:00', to: '22:00' }
        },
        {
          name: 'Mount Sinai Hospital',
          state: 'California',
          type: 'DENTAL',
          availability: { from: '12:00', to: '22:00' }
        },
        { name: 'Tufts Medical Center', state: 'Kansas', type: 'DENTAL', availability: { from: '10:00', to: '23:00' } },
        { name: 'UAB Hospital', state: 'Alaska', type: 'DENTAL', availability: { from: '11:00', to: '22:00' } },
        {
          name: 'Swedish Medical Center',
          state: 'Arizona',
          type: 'DENTAL',
          availability: { from: '07:00', to: '20:00' }
        },
        {
          name: 'Scratchpay Test Pet Medical Center',
          state: 'California',
          type: 'DENTAL',
          availability: { from: '00:00', to: '24:00' }
        },
        {
          name: 'Scratchpay Official practice',
          state: 'Tennessee',
          type: 'DENTAL',
          availability: { from: '00:00', to: '24:00' }
        }
      ]);
    });

    it('should be able to fetch and transform dental clinics with filters', async () => {
      const mockStreamFunction = mockStream(`${__dirname}/mockDentalClinic.json`);
      sandbox.stub(https, 'get').callsFake(mockStreamFunction);

      const clinics = await dentalClinic.list({
        state: 'California',
        from: '12:00',
        to: '22:00'
      });
      expect(clinics).to.be.deep.equal([
        {
          name: 'Mount Sinai Hospital',
          state: 'California',
          type: 'DENTAL',
          availability: { from: '12:00', to: '22:00' }
        }
      ]);
    });
  });
});
