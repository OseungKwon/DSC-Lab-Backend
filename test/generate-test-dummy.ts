/**
 *
 * This is for dummy buffer generator(Multipart)
 */
export const generateDummyFileBuffer = (
  extension: string,
): [Buffer, string] => {
  const dummyBuffer = Buffer.from('teeeeeeessssssstttt', 'base64');
  return [dummyBuffer, `test.${extension}`];
};
