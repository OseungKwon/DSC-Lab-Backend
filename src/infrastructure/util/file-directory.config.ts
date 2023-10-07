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

/** User Profile Director */
export const userProfileDirectory = userDirectoryBuilder('profile');
