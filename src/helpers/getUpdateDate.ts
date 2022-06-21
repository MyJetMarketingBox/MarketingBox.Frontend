export const getUpdateDate = (utc: number, uptime: number = 3) => {
  return new Date(utc + 3600000 * uptime).toJSON().slice(0, 10);
};
