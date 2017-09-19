// eslint-disable-next-line import/prefer-default-export
export const login = async (payload) => {
  const response = await Promise.resolve({
    ...payload,
    some: 'stuff',
  });
  return {
    isError: false,
    response,
  };
};
