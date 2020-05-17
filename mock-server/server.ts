const jsonServer = require('json-server');
const server = jsonServer.create();
const PORT = process.env.port || 3000;
const middlewares = jsonServer.defaults();
const router = jsonServer.router('mock-server/db.json');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(router);

server.listen(PORT, () => {
  console.log('JSON Server is running ' + PORT);
});


