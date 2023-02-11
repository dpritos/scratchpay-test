import { Request, Response } from 'express';

import { Controller } from '../entities';
import { Methods } from '../contants';
import * as log from '../lib/logger';
import ClinicService from '../services/clinic';

export default class ClinicController extends Controller {
  clinicService: ClinicService;
  path = '/clinics';
  routes = [
    {
      path: '/',
      method: Methods.GET,
      handler: this.handleGetMovies.bind(this),
      localMiddleware: []
    }
  ];

  constructor() {
    super();

    this.clinicService = new ClinicService();
  }

  async handleGetMovies(req: Request, res: Response): Promise<void> {
    try {
      const clinics = await this.clinicService.listClinics(req.query);

      super.sendSuccess(res, 'Success', clinics);
    } catch (e: any) {
      log.info(e.error);
      super.sendError(res);
    }
  }
}
