export const getId = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};
