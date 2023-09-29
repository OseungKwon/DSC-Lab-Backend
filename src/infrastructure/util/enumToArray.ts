import { AssistantRole } from '@prisma/client';

/** Enum to Array converter */
export const EnumToArray = <T>(em: object): T[] => {
  return Object.keys(em).map((element) => em[element]);
};
