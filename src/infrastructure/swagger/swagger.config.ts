import { SwaggerTags } from '@infrastructure/swagger/swagger.tags';
import { DocumentBuilder } from '@nestjs/swagger';

const documentConfig = new DocumentBuilder()
  .setTitle('DSC lab backend')
  .setDescription('Hongik University DSC Backoffice')
  .setVersion('1.0')
  .setContact(
    'Hoplin',
    'https://github.com/J-hoplin1/DSC-Lab-Backend',
    'jhoplin7259@gmail.com',
  )
  .addBearerAuth();

Object.keys(SwaggerTags).forEach((x: string) => {
  documentConfig.addTag(x, SwaggerTags[x]);
});

export default documentConfig.build();
