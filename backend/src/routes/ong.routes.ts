import { Request, Response, Router } from 'express';
import CreateOngService from '../services/ong/CreateOngService';
import { hash } from 'bcryptjs';

class OngRouter {

  public routes() {
    const router = Router();

    router.post('/', this.create)

    return router;
  }

  private async create(request: Request, response: Response) {
    const { name, email, whatsapp, city, uf, password } = request.body;

    const service = new CreateOngService();

    const passwordHashed = await hash(password, 8);

    const ong = await service.execute({
      name,
      email,
      password: passwordHashed,
      whatsapp,
      city,
      uf
    });

    // @ts-expect-error 
    delete ong.password;

    return response.status(201).json(ong)
  }

}


export default new OngRouter().routes();