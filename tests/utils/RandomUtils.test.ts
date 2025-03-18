import {NonRepeatingRandom} from "../../src/utils/RandomUtils";

describe("RandomUtils tests", () => {

    test("Generator should not repeat in the last 366 numbers", () => {
        const generator = new NonRepeatingRandom(500, 2024, 366);
        const numbers = new Set<number>();

        for(let i = 0; i < 366; i++) {
            const num = generator.next();
            
            expect(numbers.has(num)).toBeFalsy();
        }
    });

    test("Generators with the same seed generate the same numbers", () => {

        const gen1 = new NonRepeatingRandom(500, 2024);
        const gen2 = new NonRepeatingRandom(500, 2024);

        for(let i = 0; i < 100; i++) {
            expect(gen1.next()).toBe(gen2.next());
        }
        
    });

});