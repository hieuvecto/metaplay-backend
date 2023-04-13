import fastify from 'fastify';
import GamesRoutes from './modules/games/games.routes';

const server = fastify();

// Games module
server.register(
  (instance, opts, done) => {
    GamesRoutes.forEach((route) => {
      instance.route(route);
    });

    done();
  },
  { prefix: 'games' },
);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
