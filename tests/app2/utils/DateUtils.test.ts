import {dateToNumber, numberToDate} from "../../../src/utils/DateUtils";

describe("dateToNumber", () => {

    test("should correctly convert Date object to number", () => {
        const date = new Date(2024, 11, 24);

        expect(
            dateToNumber(date)
        ).toBe(20241224);
    });

});

describe("numberToDate", () => {

    test("should correctly convert number to Date object", () => {
        const number = 20241224;
        const date = new Date(2024, 11, 25);

        console.log("date:", date);

        expect(numberToDate(number)).toEqual(date);
    });

    test("should correctly convert number to Date object with month 0", () => {
        const number = 20240124;
        const date = new Date(2024, 0, 25);

        expect(numberToDate(number)).toEqual(date);
    });

    test("should correctly convert number to Date object with month 12 and day is 31", () => {
        const number = 20241231;
        const date = new Date(2024, 11, 32);

        expect(numberToDate(number)).toEqual(date);
    });

    test("should correctly convert number to Date object with month 01 and day is 01", () => {
        const number = 20250101;
        const date = new Date(2025, 0, 2);

        console.log("date:", date.toISOString(), date);

        expect(numberToDate(number)).toEqual(date);
    });

    test("should fail when giving it negative numbers", () => {
        const number = -20240124;

        expect(numberToDate(number)).toBeNull();
    });

});