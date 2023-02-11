/* eslint-disable */

/**
 * Logs an info message.
 * Takes either a string or a JSON object. And prepends [INFO]: to the message.
 * If the input is a string it will be places within a JSON object in the Message property.
 */
export const info = (message: any) => {
  if (typeof message === 'string') {
    console.info('[INFO]: ' + JSON.stringify({ Message: message }));
  } else {
    console.info('[INFO]: ' + JSON.stringify(message));
  }
};

/**
 * Logs a warning message.
 * Takes either a string or a JSON object. And prepends [WARNING]: to the message.
 * If the input is a string it will be places within a JSON object in the Message property.
 */
export const warn = (message: any) => {
  if (typeof message === 'string') {
    console.warn('[WARNING]: ' + JSON.stringify({ Message: message }));
  } else {
    console.warn('[WARNING]: ' + JSON.stringify(message));
  }
};

/**
 * Logs an error message.
 * Takes either a string or a JSON object. And prepends [ERROR]: to the message.
 * If the input is a string it will be places within a JSON object in the Message property.
 */
export const error = (message: any) => {
  if (typeof message === 'string') {
    console.error('[ERROR]: ' + JSON.stringify({ Message: message }));
  } else {
    console.error('[ERROR]: ' + JSON.stringify(message));
  }
};
