export const getImageUrl = (filePath) => {
  let domain = process.env.REACT_APP_BACKEND_URL.replace("/index.php", "");
  return domain + filePath;
};
