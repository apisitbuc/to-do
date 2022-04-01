import * as koaCors from '@koa/cors';
import * as koa from 'koa';
import * as koaBodyParser from 'koa-bodyparser';
import * as koaCompress from 'koa-compress';
import {
  RoutingControllersOptions,
  useContainer,
  useKoaServer,
} from 'routing-controllers';
import { Container } from 'typedi';
import { gracefulShutdown } from '../../libraries/shutdown/gracefulShutdown';

useContainer(Container);

export interface IRestApiServer {
  port?: number;
  hostname?: string;
  autoStart?: boolean;
  appName?: string;
  appDescription?: string;
  appVersion?: string;
}

export class RestApiServer {
  private app: koa;
  private port: number;
  private hostname: string;

  constructor() {
    this.hostname = '0.0.0.0';
    this.port = 8080;

    this.app = new koa();

    this.app.use(koaCors());
    this.app.use(koaBodyParser());
    this.app.use(koaCompress());

    const routerControllerOptions: RoutingControllersOptions = {
      defaultErrorHandler: false,
      controllers: [__dirname + '/controllers/**/!(*.test.*)'], // load any files excluding test files
    };

    useKoaServer(this.app, routerControllerOptions);
  }

  start = () => {
    const server = this.app.listen(this.port, this.hostname, () =>
      console.log(`start Server ${this.hostname}:${this.port}`),
    );

    gracefulShutdown('http', (done) => {
      server.close(done);
    });
  };
}
