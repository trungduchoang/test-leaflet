// libs
import dayjs from "dayjs";

/**
 * formatDate
 * @param date
 * @param formatDate = DD/MM/YYYY HH:mm
 * @param timezone = Asia/Ho_Chi_Minh
 */
export const formatDate = (date: string, format = "DD/MM/YYYY HH:mm") => {
  if (!date) return "";
  return dayjs(date).format(format);
};
