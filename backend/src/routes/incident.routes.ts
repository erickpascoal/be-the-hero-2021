import { Request, Response, Router } from 'express';
import IncidentDTO from '../dtos/IncedentDTO';
import authenticateToken from '../middlewares/authenticateToken';
import CreateIncidentService from '../services/incident/CreateIncidentService';
import DeleteIncidentService from '../services/incident/DeleteIncidentService';
import FindAllIncidentsByOngService from '../services/incident/FindAllIncidentsByOngService';
import FindAllIncidentsService from '../services/incident/FindAllIncidentsService';
import AppError from '../shared/errors/AppError';

class IncidentRouter {

  public routes() {
    const router = Router();

    router.get('/', this.findAll)
    router.get('/ong', authenticateToken, this.findAllByOng)
    router.post('/', authenticateToken, this.create)
    router.delete('/:id', authenticateToken, this.delete)

    return router;
  }

  private async findAll(request: Request, response: Response) {
    const { page = 1, limit = 10 } = request.query;

    const service = new FindAllIncidentsService();

    const { incidents, count } = await service.execute({ page: +page, limit: +limit });

    response.setHeader('X-Total-Count', count);

    const incidentsDTO = incidents.map(incident => new IncidentDTO(incident));

    return response.status(200).json(incidentsDTO)
  }

  private async findAllByOng(request: Request, response: Response) {
    const { page = 1, limit = 10 } = request.query;

    const ongId = request.ongId;

    const service = new FindAllIncidentsByOngService();

    const { incidents, count } = await service.execute({ ongId: +ongId, page: +page, limit: +limit });

    response.setHeader('X-Total-Count', count);

    const incidentsDTO = incidents.map(incident => new IncidentDTO(incident));

    return response.status(200).json(incidentsDTO)
  }

  private async create(request: Request, response: Response) {
    const { title, description, value } = request.body;

    let ongId = request.ongId;

    const service = new CreateIncidentService();

    const ong = await service.execute({
      title,
      description,
      value,
      ongId: ongId ? +ongId : undefined
    });

    return response.status(200).json(ong)
  }

  private async delete(request: Request, response: Response) {
    const { id } = request.params;

    let ongId = request.ongId;

    if (!ongId) {
      throw new AppError('Erro ao tentar identificar ong')
    }

    const service = new DeleteIncidentService();

    await service.execute({
      id: +id,
      ongId: +ongId
    });

    return response.status(204).json()
  }

}

export default new IncidentRouter().routes();