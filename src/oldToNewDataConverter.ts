import fs from 'fs'
import { Anime } from './anime';

export function convertData_DMDASSCToCurrent()
{
    console.log(`Converting...`);

    const oldDataPath = "./.data/users.json";
    const newDataPath = "./.data/animes.json";
    
    const users = JSON.parse(fs.readFileSync(oldDataPath, "utf-8"));

    const animes: Anime[] = users["myid"]["animes"];

    const animeList: Anime[] = [];
    for(const anime of animes)
    {
        animeList.push(anime);
    }

    console.log(animeList);

    fs.writeFileSync(newDataPath, JSON.stringify(animeList));
}