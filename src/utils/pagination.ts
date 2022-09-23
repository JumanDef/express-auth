const getPagination = (page: number, size: number): object => {
  const limit = size ? size : null;
  const offset = page ? page * limit : 0;
  return { offset, limit };
};

export default getPagination;
