export const auth = (token: string, prefix = "Bearer ") => {
  return {
    Authorization: `${prefix}${token}`,
  };
};

export const setHeader = {
  auth,
};
