/**
 * Checks if a given date is after the base date.
 * 
 * @param base Base date to check agains
 * @param date Check this date
 */
export function isAfter(base: Date, date: Date) : boolean {
    return date.getTime() > base.getTime();
}

export function getDistanceInDays(base: Date, date: Date) : number {
    const diffTime = Math.abs(base.getTime() - date.getTime());

    return Math.floor(diffTime / 86400000);
}

/**
 * Converts a date to a number.
 *
 * @param date Date object or year
 * @param month Month if first argument is a number, unused otherwise.
 * @param day Day if first argument is a number, unused otherwise.
 * @returns Date number formatted in YYYYMMDD.
 */
export function dateToNumber(
    yearOrDate: Date | number,
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
        `${yearOrDate.getFullYear()}${
            `${yearOrDate.getMonth() + 1}`.padStart(2, "0")
        }${`${yearOrDate.getDate()}`.padStart(2, "0")}`,
    );
}

/**
 * Converts a YYYYMMDD number to a js Date
 * 
 * @param num Number to convert
 * @returns Date
 */
export function numberToDate(num:number) : Date | null {
    const str = "" + num;

    if(str.length !== 8) return null;

    const yearString = str.substring(0, 4);
    const monthString = str.substring(4, 6);
    const dayString = str.substring(6, 8);

    return new Date(
        parseInt(yearString),
        parseInt(monthString) - 1,
        parseInt(dayString) + 1
    );
}