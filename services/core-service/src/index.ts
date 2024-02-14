import * as Koa from 'koa';
import * as cors from '@koa/cors';
import { Router, propagateErrors, propagateValues, err } from '@lcdev/router';
import Quiz from './routes/quiz';
import { createServer, createLogger, getLogger } from './utils';
import config, { loadConfig } from '@lcdev/app-config';
import { connect, Knexion } from './lib/database';

const isProduction = process.env.NODE_ENV === 'production';

const main = async () => {
  
  await loadConfig();

  const server = new Koa();
  const logger = createLogger({ debug: !isProduction });

  const knex = connect(config.database, true, Knexion.Default);

  await knex.migrate.latest();

  await knex.seed.run({
    directory: `${__dirname}/lib/seeds`
  });

  const allowAllOrigins = config.webServer.allowedOrigins.find(origin => origin === '*');

  server.use(cors({
    credentials: true,
    origin: allowAllOrigins ? '*' : (ctx) => {
      const origin = ctx.get('origin');
      if (config.webServer.allowedOrigins.includes(origin)) {
        return origin;
      }
      return '';
    }
  }));
  server.use(propagateErrors(!isProduction));
  server.use(propagateValues());

  const router = new Router({ prefix: '/api' });

  router.use('/quiz', Quiz());

  server
    .use(router.routes())
    .use(router.allowedMethods())
    .use(() => {
      throw err(404, 'Not Found');
    });

  await createServer(server, config.webServer.port, logger);
};

main().catch(error => {
  const logger = getLogger();
  (logger || console).error('a fatal error occurred', error);
  process.exit(1);
});
