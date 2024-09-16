import fs from 'fs';
import { randomString } from './utils/Utils.js';

const CACHE_EXPIRATION = 1000 * 60 * 60 * 24 * 7; // 1 week

const cacheMap = new Map<string, string>();

export function cacheThis(url: string, content: string) {
    cacheMap.set(url, content);
}

export function getCached(url: string): string | undefined {
    return cacheMap.get(url);
}

export function saveCacheToFile() {

    if (!fs.existsSync('cache')) {
        fs.mkdirSync('cache');
    }

    let cacheData: { [key: string]: string } = {};

    if (fs.existsSync('cache/cache.json')) {
        const cacheFile = fs.readFileSync('cache/cache.json', 'utf-8');

        cacheData = JSON.parse(cacheFile).cache;
    }

    for (const [key, value] of cacheMap) {

        if (cacheData[key]) {
            continue;
        }

        const fileName = randomString(16);

        fs.writeFileSync(`cache/${fileName}`, value);

        cacheData[key] = fileName;
    }

    fs.writeFileSync('cache/cache.json', JSON.stringify({
        time: Date.now(),
        cache: cacheData
    }));

    console.log('Cache saved to file');
}

/**
 * Load the cache from the file system
 */
export function loadCacheFromFile() {

    if (!fs.existsSync('cache/cache.json')) {
        console.log('No cache file found, skipping cache load');
        return;
    }

    const cacheFile = fs.readFileSync('cache/cache.json', 'utf-8');
    const cache = JSON.parse(cacheFile) as CacheType;

    if (!cache) {
        console.warn('Cache file is empty');
        return
    }

    if (cache.time + CACHE_EXPIRATION < Date.now()) {
        console.log('Cache expired, skipping cache load');
        return;
    }

    const cacheData = cache.cache;

    for (const key in cacheData) {
        const savedFileName = cacheData[key];

        if (fs.existsSync(`cache/${savedFileName}`)) {
            const content = fs.readFileSync(`cache/${savedFileName}`, 'utf-8');

            cacheMap.set(key, content);
        } else {
            console.warn(`[CACHE] File ${savedFileName} not found for key ${key}`);
        }
    }

    console.log('Cache loaded from file');

}

type CacheType = {
    time: number;
    cache: {
        [key: string]: string;
    };
}