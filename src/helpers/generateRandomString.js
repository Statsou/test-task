export const generateRandomString = () => {
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  while (result.length < 21) {
    result += abc[Math.floor(Math.random() * abc.length)];
  }
  return result;
};
