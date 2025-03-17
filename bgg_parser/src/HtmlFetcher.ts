import { cacheThis, getCached } from "./CacheManager.js";

/**
 * Fetches the ranklist page from BGG
 * 
 * @param page Page number
 * @returns String of the HTML content
 */
export function fetchRanklistPage(page: number): Promise<string> {

    console.log('Fetching rank list page', page);

    return new Promise((resolve, reject) => {
        const url = 'https://boardgamegeek.com/browse/boardgame/page/' + page;

        // Check if the content is cached
        const cachedContent = getCached(url);

        if (cachedContent) {
            // Resolve the promise with the cached content
            resolve(cachedContent);
            return;
        }

        // Fetch the content
        fetch(url, { method: 'GET', })
            .then(res => res.text())
            .then(content => {
                cacheThis(url, content);

                // Resolve the promise with the content
                resolve(content);
            })
            .catch(err => {
                // Reject the promise with the error
                reject(err);
            });
    });

}

/**
 * Fetches the game page from BGG
 * 
 * @param id ID of the game
 * @returns String of the HTML content
 */
export function fetchGamePage(id: string): Promise<string> {

    return new Promise((resolve, reject) => {

        const url = 'https://boardgamegeek.com/boardgame/' + id;

        // Check if the content is cached
        const cachedContent = getCached(url);

        if (cachedContent) {
            // Resolve the promise with the cached content
            resolve(cachedContent);
            return;
        }

        // Fetch the content
        fetch(url, { method: 'GET', })
            .then(res => res.text())
            .then(content => {
                cacheThis(url, content);

                // Resolve the promise with the content
                resolve(content);
            })
            .catch(err => {
                // Reject the promise with the error
                reject(err);
            });

    });

}