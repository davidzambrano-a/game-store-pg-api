import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './dbConfig/dbConsts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configS = app.get(ConfigService); // Setting .env file
  const port = +configS.get<number>(SERVER_PORT) || 3001; // Alternative PORT
  await app.listen(port);
  console.log(`Server on port: ${await app.getUrl()}`);
}
bootstrap();
