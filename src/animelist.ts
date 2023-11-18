import { Anime } from "./anime";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const PATH_DATA = "./.data/";
const PATH_ANIMES_DATA = PATH_DATA + "/animes.json";

export class Animelist {
    private _animes = new Map<string, Anime>();

    public get animes() { return this._animes; }

    public createNewAnime(name: string): Anime
    {
        const anime: Anime = {
            id: uuidv4(),
            name: name,
            watchedEpisodes: 0,
            totalEpisodes: 0,
            watchedOvas: 0,
            totalOvas: 0,
            lastUpdated: Date.now(),
            imageUrl: ""
        };

        this._animes.set(anime.id, anime);

        console.log(`[Animelist] createNewAnime ID ${anime.id}, name '${name}'`);

        return anime;
    }

    public deleteAnime(id: string)
    {
        this._animes.delete(id);
    }

    public saveData()
    {
        const data = Array.from(this.animes.values());

        if(!fs.existsSync(PATH_DATA)) fs.mkdirSync(PATH_DATA);

        fs.writeFileSync(PATH_ANIMES_DATA, JSON.stringify(data));
    }

    public loadData()
    {
        if(!fs.existsSync(PATH_DATA)) fs.mkdirSync(PATH_DATA);

        if(!fs.existsSync(PATH_ANIMES_DATA)) return;

        const data: Anime[] = JSON.parse(fs.readFileSync(PATH_ANIMES_DATA, "utf-8"));

        this._animes.clear();
        for(const anime of data)
        {
            this._animes.set(anime.id, anime);
        }
    }
}