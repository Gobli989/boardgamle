export class NonRepeatingRandom {
    private history: Set<number>;
    private maxSize: number;
    private maxValue: number;
    private seed: number;
    
    constructor(maxValue: number, seed: number, historySize: number = 365) {
        this.maxValue = maxValue;
        this.seed = seed;
        this.history = new Set();
        this.maxSize = historySize;
    }

    private seededRandom(): number {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }
    
    public next(): number {
        let value;
        let attempts = 0;
        
        do {
            value = Math.floor(this.seededRandom() * this.maxValue);
            attempts++;
        } while (this.history.has(value) && attempts < this.maxValue);
        
        this.history.add(value);
        
        if (this.history.size > this.maxSize) {
            this.history.delete(this.history.values().next().value!);
        }
        
        return value;
    }
}

/**
 * Generates a random value with a ceiling that does not repeat
 * in the last 365 iterations. 
 * 
 * @param date Date to check against
 * @param max Max value
 * @returns A random value
 */
export function nonRepeatingSeededRandom(seed: number, max: number, historySize = 365) : number {
    const generator = new NonRepeatingRandom(max, seed, historySize);
    return generator.next();
}