import 'dotenv/config';
import 'reflect-metadata';

import dataSource from './src/infrastructure/persistence/data-source';
import app from './src/app';

const server = app.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
});

process.on('SIGTERM', async () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  await dataSource.destroy();
  server.close((err) => {
    console.log('Http server closed.');
    process.exit(err ? 1 : 0);
  });
});

export default server;
