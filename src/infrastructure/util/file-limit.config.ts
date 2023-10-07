import { MulterOptionFactoryInput } from './multer-option.factory';

/** Profile Image Limit */
export const ProfileImageConfig: MulterOptionFactoryInput = {
  size: 4,
  extension: /^.*\.(jpg|jpeg|svg|png|webp)$/,
};
