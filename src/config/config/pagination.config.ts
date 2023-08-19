import { registerAs } from '@nestjs/config';

export default registerAs('pagination', () => {
  return {
    page: +process.env.DEFAULT_PAGE,
    size: +process.env.DEFAULT_SIZE,
  };
});
