import RESPONSE_CODES from './responseCodes';

const { INVALID_REQUEST, SERVER_ERROR } = RESPONSE_CODES;
const messages = {
  [INVALID_REQUEST]: 'Invalid request',
  [SERVER_ERROR]: 'Something went wrong'
};

export default messages;
