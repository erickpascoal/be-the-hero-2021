import { getRepository, Repository } from "typeorm";
import Incident from "../../models/Incident";
import AppError from "../../shared/errors/AppError";

interface Props {
  id: number,
  ongId: number
}

export default class DeleteIncidentService {

  private repository: Repository<Incident>;

  constructor() {
    this.repository = getRepository(Incident);
  }

  public async execute({ id, ongId }: Props) {

    await this.verifyIncidentExists(id, ongId);

    await this.repository.delete(id);
  }


  private async verifyIncidentExists(id: number, ongId: number) {
    const incident = await this.repository.findOne({
      where: {
        id, ongId
      }
    });

    if (!incident) {
      throw new AppError('Incidente não encontrado')
    }
  }
}