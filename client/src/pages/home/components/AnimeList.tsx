import React from 'react';
import { Anime } from '../../../../../src/anime'
import AnimeListItem from './AnimeListItem';

function AnimeList() {
    const [animes, setAnimes] = React.useState<Anime[]>([]);

    React.useEffect(() => {
    fetch("/api/animes").then(response => response.json()).then(data => {
        console.log(data)

        setAnimes(data);
    })
}, [])

    return (
        <div>
            <div>{animes.length} animes</div>
            { animes.sort((a, b) => b.lastUpdated - a.lastUpdated ).map(anime => <AnimeListItem key={anime.id} anime={anime} />) }
        </div>
    );
}

export default AnimeList;
