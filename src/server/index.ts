import { App } from './app';

const app = new App();
(async (): Promise<any> => {
  await app.start()
})()
