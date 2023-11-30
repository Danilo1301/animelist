import React from 'react';
import { Anime } from '../../../../../src/anime'

function AnimeListItem({ anime }: { anime: Anime }) {

    //badge

    let badgeText = "Não assistido";
    let badgeColor = "#444444";

    if(anime.watchedEpisodes > 0)
    {
        badgeText = "Assistindo";
        badgeColor = "#ffc107";

        if(anime.totalEpisodes === 0)
        {
            badgeText = "Aguardando novo episódio";
            badgeColor = "#0dcaf0";
        }

        if(anime.watchedEpisodes === anime.totalEpisodes)
        {
            badgeText = "Assistido";
            badgeColor = "green";
        }
    }

    //watchedEpisodes

    let watchedEpisodesText = "Episódios assistidos: ";

    watchedEpisodesText += anime.watchedEpisodes;

    if(anime.totalEpisodes !== 0)
    {
        watchedEpisodesText += " / ";
        watchedEpisodesText += anime.totalEpisodes;
    }

    //nextEpisode

    let nextEpisodeText = "";

    if(anime.totalEpisodes === 0 && anime.nextEpisodeDate)
    {
        const days = Math.ceil(daysBetween(new Date(), new Date(anime.nextEpisodeDate)));
        nextEpisodeText = "Próximo episódio em " + days + " dias";
    }

    //

    const handleClick = () => {
        console.log("click", anime);

        window.location.href = "/anime/" + anime.id;
    }

    return (
        <div className='row p-1 rounded' style={{background: "#eceeff", marginBottom: "5px"}} onClick={handleClick}>
            <div className="col-auto p-0">
                <img alt="Image" src={anime.imageUrl} style={{width: "100px", minHeight: "100px", minWidth: "100px", background: "white"}} className="rounded img-fluid float-left"></img>
            </div>
            <div className="col">
                <div>
                    <b>{anime.name}</b>
                </div>
                <div>
                    <span className="badge" style={{background: badgeColor}}>{badgeText}</span>
                </div>
                <div>
                    <span>{watchedEpisodesText}</span>
                </div>
                <div>
                    <span>{nextEpisodeText}</span>
                </div>
            </div>
        </div>
  );
}

export default AnimeListItem;

function treatAsUTC(date: Date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate: Date, endDate: Date) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate).getTime() - treatAsUTC(startDate).getTime()) / millisecondsPerDay;
}
  