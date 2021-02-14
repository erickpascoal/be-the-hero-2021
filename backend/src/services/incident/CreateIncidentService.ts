import { getRepository } from "typeorm";
import Incident from "../../models/Incident";

interface Props {
  title: string,
  description: string,
  value: number,
  ongId: number | undefined;
}

export default class CreateIncidentService {

  public async execute(incident: Props) {

    const repository = getRepository(Incident);

    const incidentCreated = repository.create(incident);
    await repository.save(incidentCreated);

    return incidentCreated;
  }
}