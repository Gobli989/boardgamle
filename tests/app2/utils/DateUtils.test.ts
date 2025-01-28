import { dateToNumber, numberToDate } from "../../../src/app2/utils/DateUtils";

import { Temporal } from "@js-temporal/polyfill";

describe("dateToNumber", () => {

    test("should correctly convert PlainDate", () => {

        const date = new Temporal.PlainDate(2024, 12, 24);

        const outputNumber = dateToNumber(date);

        expect(outputNumber).toBe(20241224);
    });

    test("should correctly convert year, month, day", () => {

        const outputNumber = dateToNumber(2024, 12, 24);

        expect(outputNumber).toBe(20241224);
    });

});

describe("numberToDate", () => {

    test("should correctly convert number to PlainDate", () => {

        const outputDate = numberToDate(20241224);

        expect(outputDate).toEqual(
            new Temporal.PlainDate(2024, 12, 24)
        );

    });

    test("should fail when giving it -1", () => {

        const outputDate = numberToDate(-1);

        expect(outputDate).toBeNull();

    });

    test("should fail when giving it -123456789", () => {

        const outputDate = numberToDate(-123456789);

        expect(outputDate).toBeNull();

    });

});