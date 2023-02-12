/*istanbul ignore file */
import * as fs from 'fs';
import { PassThrough } from 'stream';

import { expect } from 'chai';
import * as sinon from 'sinon';

import * as log from '../src/lib/logger';

const stubLogger = (sandbox: sinon.SinonSandbox) => {
  sandbox.stub(log, 'info');
  sandbox.stub(log, 'warn');
  sandbox.stub(log, 'error');
};

const checkAllStubs = (stubs: any, times: number = 1) => {
  stubs.forEach((stub: any) => {
    expect(stub.callCount).to.equal(times);
  });
};

const copyObject = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

const mockStream = (mockDataFilePath: string) => {
  const mockResponse = fs.readFileSync(mockDataFilePath, 'utf-8');
  //Using a built-in PassThrough stream to emit needed data.
  const mockStream = new PassThrough();
  mockStream.push(mockResponse);
  mockStream.end(); //Mark that we pushed all the data.

  return (options: any, callback?: any) => {
    callback(mockStream);

    return { end: sinon.stub(), on: sinon.stub() } as any; //Stub end method btw
  };
};

export { stubLogger, checkAllStubs, copyObject, mockStream };
