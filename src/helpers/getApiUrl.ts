export const getApiUrl = (url: string) => {
  const urlString = new URL(url);
  if (urlString.search) {
    return urlString.href.split(urlString.search)[0].split(urlString.origin)[1];
  }
  return urlString.href.split(urlString.origin)[1];
};
