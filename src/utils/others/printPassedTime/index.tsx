// libs
import dayjs from "dayjs";

type TAcceptedDate = string | Date;
type TProps = {
  time: TAcceptedDate;
  t: (key: string, params?: TObject) => string;
};
/**
 * printPassedTime
 * @description Calculate passed time from now
 * @param time
 * @param t translation fn
 */
export function printPassedTime({ time, t }: TProps) {
  const now = dayjs();
  const comparedTime = dayjs(time);
  const milisecondDiff = now.diff(comparedTime);
  const { n, unit } = calculatePassedTime(milisecondDiff);

  switch (unit) {
    case "second":
      return t("messages.fewSecondsAgo");
    case "minute":
      if (n === 1) return t("messages.oneMinutesAgo");
      return t("messages.nMinutesAgo", { n });

    case "hour":
      if (n === 1) return t("messages.oneHoursAgo");
      return t("messages.nHoursAgo", { n });

    case "day":
      if (n === 1) return t("messages.oneDaysAgo");
      return t("messages.nDaysAgo", { n });

    case "month":
      if (n === 1) return t("messages.oneMonthsAgo");
      return t("messages.nMonthsAgo", { n });

    case "year":
      if (n === 1) return t("messages.oneYearsAgo");
      return t("messages.nYearsAgo", { n });

    default:
      return "";
  }
}

/**
 * calculatePassedTime
 * @description From milisecond convert to somethings look like second / 1day / 2month / ...
 * @param milisecondDiff
 * @returns n
 * @returns unit
 */
function calculatePassedTime(
  milisecondDiff: number,
): {
  n: number;
  unit: "second" | "minute" | "hour" | "day" | "month" | "year";
} {
  if (milisecondDiff < 60000) return { n: -1, unit: "second" };
  if (milisecondDiff < 120000) return { n: 1, unit: "minute" };
  if (milisecondDiff < 3600000)
    return { n: Math.floor(milisecondDiff / 60000), unit: "minute" };
  if (milisecondDiff < 7200000) return { n: 1, unit: "hour" };
  if (milisecondDiff < 86400000)
    return { n: Math.floor(milisecondDiff / 3600000), unit: "hour" };
  if (milisecondDiff < 172800000) return { n: 1, unit: "day" };
  if (milisecondDiff < 2629800000)
    return { n: Math.floor(milisecondDiff / 86400000), unit: "day" };
  if (milisecondDiff < 5259600000) return { n: 1, unit: "month" };
  if (milisecondDiff < 31557600000)
    return { n: Math.floor(milisecondDiff / 2629800000), unit: "month" };
  if (milisecondDiff < 63115200000) return { n: 1, unit: "year" };
  return { n: Math.floor(milisecondDiff / 31557600000), unit: "year" };
}
