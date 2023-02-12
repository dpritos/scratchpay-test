import * as dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const DENTAL_CLINIC_SOURCE = process.env.DENTAL_CLINIC_SOURCE || '';
export const VET_CLINIC_SOURCE = process.env.VET_CLINIC_SOURCE || '';
