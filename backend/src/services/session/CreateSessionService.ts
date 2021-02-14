import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import Ong from "../../models/Ong";
import authConfig from '../../config/auth'
import { sign } from "jsonwebtoken";
import AppError from "../../shared/errors/AppError";

interface Props {
  email: string,
  password: string
}

export default class CreateSessionService {

  public async execute({ email, password }: Props) {

    const repository = getRepository(Ong);

    const ong = await repository.findOne({ where: { email } });

    if (!ong) {
      throw new AppError('Usuário ou senha inválidos');
    }

    const passwordMatched = await compare(password, ong.password)

    if (!passwordMatched) {
      throw new AppError('Usuário ou senha inválidos');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(ong.id),
      expiresIn,
    });


    return { ong, token };
  }

}