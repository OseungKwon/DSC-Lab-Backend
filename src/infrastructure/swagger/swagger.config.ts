import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const SwaggerDefinition = () => {
  const config: DocumentBuilder = new DocumentBuilder()
    .setTitle('DSC Backoffice')
    .setDescription('Basckoffice API')
    .setVersion('1.0');

  const options: SwaggerCustomOptions = {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  return {
    config,
    options,
  };
};
