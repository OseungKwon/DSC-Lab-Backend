export const PaginationCounter = (
  page: number,
  size: number,
): [skip: number, take: number] => {
  // if page is set lower than 0
  if (page <= 0) {
    page = 1;
  }
  const skip = (page - 1) * size;
  return [skip, size];
};
