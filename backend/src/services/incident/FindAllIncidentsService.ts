import { getRepository } from "typeorm";
import Incident from "../../models/Incident";

interface Props {
  page: number,
  limit: number,
}

export default class FindAllIncidentsService {

  public async execute({ page = 1, limit = 10 }: Props) {

    const repository = getRepository(Incident);

    const [incidents, count] = await repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit
    });


    return { incidents, count };
  }

}