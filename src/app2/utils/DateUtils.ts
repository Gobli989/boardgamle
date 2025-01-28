import { Temporal } from "@js-temporal/polyfill";

/**
 * Converts a date to a number.
 *
 * @param date Date object or year
 * @param month Month if first argument is a number, unused otherwise.
 * @param day Day if first argument is a number, unused otherwise.
 * @returns Date number formatted in YYYYMMDD.
 */
export function dateToNumber(
    yearOrDate: Temporal.PlainDate | number,
    month?: number,
    day?: number,
): number {
    if (typeof yearOrDate === "number") {
        // Use year, month and day
        return parseInt(
            `${yearOrDate}${`${month}`.padStart(2, "0")}${
                `${day}`.padStart(2, "0")
            }`,
        );
    }

    return parseInt(
        `${yearOrDate.year}${`${yearOrDate.month}`.padStart(2, "0")}${
            `${yearOrDate.day}`.padStart(2, "0")
        }`,
    );
}

/**
 * Converts a YYYYMMDD number to a js Date
 *
 * @param num Number to convert
 * @returns Date
 */
export function numberToDate(num: number): Temporal.PlainDate | null {
    const str = "" + num;

    if (str.length !== 8) return null;

    const yearString = str.substring(0, 4);
    const monthString = str.substring(4, 6);
    const dayString = str.substring(6, 8);

    return new Temporal.PlainDate(
        parseInt(yearString),
        parseInt(monthString),
        parseInt(dayString),
    );
}
