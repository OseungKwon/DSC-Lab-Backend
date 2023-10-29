/** Build assistant director */
const assistantDirectoryBuilder = (directory: string) => {
  return `assistant/${directory}`;
};

/** Build user directory */
const userDirectoryBuilder = (directory: string) => {
  return `user/${directory}`;
};

/** Assistant Profile Directory */
export const assistantProfileDirectory = assistantDirectoryBuilder('profile');

/** User Profile Directory */
export const userProfileDirectory = userDirectoryBuilder('profile');

/** Form thumbnail Directory */
export const formThumbnailDirectory = assistantDirectoryBuilder('form');
