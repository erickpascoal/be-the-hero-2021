import { getRepository, Repository } from "typeorm";
import Ong from "../../models/Ong";
import AppError from "../../shared/errors/AppError";

interface Props {
  name: string,
  email: string,
  password: string,
  whatsapp: string,
  city: string,
  uf: string
}

export default class CreateOngService {

  private repository: Repository<Ong>;

  constructor() {
    this.repository = getRepository(Ong);
  }

  public async execute(ong: Props) {

    await this.verifyOngEmailAlreadyExists(ong.email);

    const ongCreated = this.repository.create(ong);
    await this.repository.save(ongCreated);

    return ongCreated;
  }

  private async verifyOngEmailAlreadyExists(email: string) {

    const ongSameEmail = await this.repository.findOne({
      where: {
        email
      }
    });

    if (ongSameEmail) {
      throw new AppError('Email já utilizado por uma ong');
    }
  }

}