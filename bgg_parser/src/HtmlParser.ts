import htmlParser from 'node-html-parser';
import { Game } from './types/Game.js';

import fs from 'fs';
import { CompletionInfoFlags } from 'typescript';

export function parseRankList(content: string): Game[] {

    let outputData: Game[] = [];

    const html = htmlParser.parse(content);
    const tableDom = html.querySelector('.collection_table');

    if (!tableDom) {
        console.warn('No table found');
        return [];
    }

    const rows = tableDom?.querySelectorAll('tr#row_');

    if (!rows) {
        console.warn('No rows found');
        return [];
    }

    for (const row of rows) {
        const rank = parseInt(row.querySelector('.collection_rank')?.text.trim()!);
        const nameYearDom = row.querySelector('.collection_objectname div[id^="results_objectname"]')!;
        const nameDom = nameYearDom.querySelector('a')!;
        const url = nameDom.getAttribute('href')!;
        const id = url.split('/')[2];
        const name = nameDom.text.trim();
        const yearString = nameYearDom.querySelector('span')?.text.trim()!;
        const year = parseInt(yearString.substring(1, yearString.length - 1));
        const geekRating = parseFloat(row.querySelector('.collection_bggrating')?.text.trim()!);

        outputData.push({
            id,
            rank,
            name,
            year,
            geekRating,
            url: "https://boardgamegeek.com/" + url
        });

    }

    return outputData;
}

export function parseGamePage(content: string, originalGame?: Game) {

    const startIndex = content.indexOf('GEEK.geekitemPreload =') + 'GEEK.geekitemPreload ='.length;
    const endIndex = content.indexOf('GEEK.geekitemSettings');
    let between = content.substring(startIndex, endIndex).trim();
    between = between.substring(0, between.length - 1);
    const json = JSON.parse(between);

    return {
        id: json.item.id,
        rank: parseInt(json.item.rankinfo.find((r: any) => r.rankobjectid === 1).rank),
        name: json.item.name,
        year: parseInt(json.item.yearpublished),
        geekRating: parseFloat(json.item.stats.average),
        url: json.item.canonical_link,
        imageUrl: json.item.images.square200,
        complexityRating: parseFloat(json.item.polls.boardgameweight.averageweight),
        minPlayers: parseInt(json.item.minplayers),
        maxPlayers: parseInt(json.item.maxplayers),
        minPlaytime: parseInt(json.item.minplaytime),
        maxPlaytime: parseInt(json.item.maxplaytime),
    }

    // const html = htmlParser.parse(content);

    // const gameHeader = html.querySelector('.game-header')!;
    // const imgSrc = gameHeader.querySelector('.game-header-image img')?.getAttribute('src')!;
    // const gameplayItemsDom = gameHeader.querySelectorAll('ul.gameplay li.gameplay-item')!;
    // const complexityRating = parseFloat(gameplayItemsDom[3].querySelector('p.gameplay-item-primary span.ng-binding')?.text.trim()!);

    // if (!originalGame) {
    //     // If we don't have the original game, we are parsing a new game

    //     const id = html.querySelector('div.game-itemid')!.text.trim().replace('BGG Item ID: ', '');
    //     const rank = parseInt(gameHeader.querySelector('span.rank-number a.rank-value')!.text.trim());
    //     const name = gameHeader.querySelector('div.game-header-title span[itemprop="name"]')!.text.trim();
    //     const year = parseInt(
    //         gameHeader.querySelector('div.game-header-title span.game-year')!.text.trim()
    //             .replace('(', '')
    //             .replace(')', '')
    //     );
    //     const geekRating = parseFloat(gameHeader.querySelector('span[itemprop="ratingValue"]')!.text.trim());
    //     const url = "https://boardgamegeek.com/boardgame/" + id;

    //     originalGame = {
    //         id,
    //         rank,
    //         name,
    //         year,
    //         geekRating,
    //         url
    //     }
    // } else {
    //     // If we have the original game, we are updating the game

    //     originalGame.imageUrl = imgSrc;
    //     originalGame.complexityRating = complexityRating;
    // }

    // return originalGame;
}