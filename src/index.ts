import { server } from './server/Server';
import dotenv from 'dotenv';
dotenv.config({path: __dirname+'/../.env'});

server.listen(process.env.PORT || 3333,() => {
  console.log(`App rodando na porta ${process.env.PORT || 3333}`);
});