import { getRepository } from "typeorm";
import Incident from "../../models/Incident";

interface Props {
  ongId: number,
  page: number,
  limit: number,
}

export default class FindAllIncidentsByOngService {

  public async execute({ ongId, page = 1, limit = 10 }: Props) {

    const repository = getRepository(Incident);

    const [incidents, count] = await repository.findAndCount({
      where: { ongId },
      take: limit,
      skip: (page - 1) * limit
    });


    return { incidents, count };
  }

}