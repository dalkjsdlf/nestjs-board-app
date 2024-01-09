import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8300;
  await app.listen(port, ()=>{
    console.log('Board By Nestjs is started!!');
  });
}
bootstrap();
