import { Request, Response, Router } from 'express';
import CreateSessionService from '../services/session/CreateSessionService';

class OngRouter {

  public routes() {
    const router = Router();

    router.post('/', this.create)

    return router;
  }

  private async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const service = new CreateSessionService();

    const { ong, token } = await service.execute({ email, password });

    // @ts-expect-error 
    delete ong.password;

    return response.status(201).json({ ong, token })
  }


}


export default new OngRouter().routes();