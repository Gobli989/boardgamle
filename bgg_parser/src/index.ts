import { loadCacheFromFile, saveCacheToFile } from './CacheManager.js';
import { fetchGamePage, fetchRanklistPage } from './HtmlFetcher.js';
import { parseGamePage, parseRankList } from './HtmlParser.js';
import { Game } from './types/Game.js';
import fs from 'fs';

// First we load the cache from file
loadCacheFromFile();

let games: Game[] = [];

for (let i = 1; i <= 5; i++) {
    const html = await fetchRanklistPage(i);
    const gamesArray = parseRankList(html);

    games = [...games, ...gamesArray];
}

console.log('Successfully fetched game ranklists');

for(let i = 0; i < games.length; i++) {
    const game = games[i];

    // Fetch game pages

    const html = await fetchGamePage(game.id);
    saveCacheToFile();

    const updatedGame = parseGamePage(html, game);
    games[i] = updatedGame;

    console.log('Game:', updatedGame.rank, updatedGame.name, updatedGame.year, updatedGame.geekRating, updatedGame.complexityRating);

}

console.log('Successfully fetched all games');

fs.writeFileSync('all_games.json', JSON.stringify(games));

// Last is to save the cache to file
saveCacheToFile();
