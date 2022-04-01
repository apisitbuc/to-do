import { RestApiServer } from './api/rest';

try {
  const restApiServer = new RestApiServer();
  restApiServer.start();
} catch (error) {
  process.exit(-1);
}
