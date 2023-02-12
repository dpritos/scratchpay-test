/* istanbul ignore file */
export const hourStringToNumber = (str: string): number => {
  const hour = parseInt(str.substring(0, str.indexOf(':')) as any);
  const minute = parseInt(str.substring(str.indexOf(':') + 1) as any);
  return hour + minute / 60;
};
