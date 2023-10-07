/** For multer file size limit. Multer require byte size  */
export const MBtoByte = (size: number) => {
  return size * 1024 * 1024;
};
