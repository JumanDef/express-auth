const getPagination = (page: number, size: number): object => {
  const limit = size ? size : 10;
  const offset = page ? page * limit : 1;
  return { offset, limit };
};

export default getPagination;
