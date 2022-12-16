import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = await require('cors');
  const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  await app.listen(5000);
}
bootstrap();
