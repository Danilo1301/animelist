import React from 'react';
import { useParams } from 'react-router-dom';
import { Anime } from '../../../../src/anime';
import { response } from 'express';
import { getAuthKey } from '../home/Home';

const getAnimeInfo = async (id: string) => {
    return new Promise<Anime>((resolve, reject) =>
    {
        fetch("/api/anime/" + id, {method: 'GET'})
        .then(response => response.json())
        .then((anime: Anime) => {
            resolve(anime)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

function AnimePage() {
    const params = useParams();
    const id = params.id!;
  
    //if(!id) return <>INVALID ID</>
  
    const [anime, setAnime] = React.useState<Anime>();

    React.useEffect(() => {
        getAnimeInfo(id).then(data => {
            console.log(data);

            setAnime(data);

            setName(data.name);
            setWatchedEpisodes(data.watchedEpisodes);
            setTotalEpisodes(data.totalEpisodes);
            setWatchedOvas(data.watchedOvas);
            setTotalOvas(data.totalOvas);
            setImageUrl(data.imageUrl);
            if(data.nextEpisodeDate) {
                const date = new Date(data.nextEpisodeDate);
                setNextEpisode(date.toISOString().substr(0, 10));
            }
        })
    }, [])

    const [name, setName] = React.useState("");
    const [watchedEpisodes, setWatchedEpisodes] = React.useState(0);
    const [totalEpisodes, setTotalEpisodes] = React.useState(0);
    const [watchedOvas, setWatchedOvas] = React.useState(0);
    const [totalOvas, setTotalOvas] = React.useState(0);
    const [imageUrl, setImageUrl] = React.useState("");
    const [nextEpisode, setNextEpisode] = React.useState("");

    const handleSave = () => {
        console.log("save")
    
        const anime: Anime = {
          id: id,
          name: name,
          watchedEpisodes: watchedEpisodes,
          totalEpisodes: totalEpisodes,
          watchedOvas: watchedOvas,
          totalOvas: totalOvas,
          nextEpisodeDate: nextEpisode == "" ? undefined : new Date(nextEpisode).getTime(),
          lastUpdated: Date.now(),
          imageUrl: imageUrl
        }
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({anime: anime, key: getAuthKey()})
        };
    
        console.log('/update', requestOptions)

        fetch('/api/anime/' + id + "/update", requestOptions)
        .then(response => response.json())
        .then(data => {
              console.log(data);
    
            window.location.href = "/"
        });
    
        console.log(anime)
    }

    const handleDelete = () => {
        console.log("delete")

        const promptResult = prompt("Delete?")
        
        if(promptResult == null) return;

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({key: getAuthKey()})
        };
    
        fetch('/api/anime/' + id + "/delete", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
    
            window.location.href = "/"
        });
    }

    if(!anime) return <></>;
  
    return (
        <div className='container'>
            <h3>Edit anime</h3>
            <b>Anime ID {id}</b>
            
            <div className='mt-4'>
                <span>Name:</span>
                <input type="text" className="form-control" placeholder="Username" onChange={e => setName(e.target.value)} value={name}></input>
            </div>

            <div className='row'>
                <div className='col'>
                    <span>Watched episodes:</span>
                    <input type="number" className="form-control" placeholder="Watched episodes" onChange={e => setWatchedEpisodes(parseInt(e.target.value))} value={watchedEpisodes}></input>
                </div>
                <div className='col'>
                    <span>Total episodes:</span>
                    <input type="number" className="form-control" placeholder="Total episodes" onChange={e => setTotalEpisodes(parseInt(e.target.value))} value={totalEpisodes}></input>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <span>Watched OVAs:</span>
                    <input type="number" className="form-control" placeholder="Watched OVAs" onChange={e => setWatchedOvas(parseInt(e.target.value))} value={watchedOvas}></input>
                </div>
                <div className='col'>
                    <span>Total OVAs:</span>
                    <input type="number" className="form-control" placeholder="Total OVAs" onChange={e => setTotalOvas(parseInt(e.target.value))} value={totalOvas}></input>
                </div>
            </div>

            <div className=''>
                <span>Image URL:</span>
                <input type="text" className="form-control" placeholder="Image URL" onChange={e => setImageUrl(e.target.value)} value={imageUrl}></input>
            </div>

            <div className=''>
                <span>Next episode date:</span>
                <input type="date" className="form-control" placeholder="Next episode date" onChange={e => {
                    const str = e.target.value;
                    const date = new Date(str);

                    console.log(str, date.getTime());

                    setNextEpisode(str);
                }} value={nextEpisode}></input>
            </div>

            <div className='row mt-4'>
                <div className='col d-grid'>
                    <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                </div>
                <div className='col d-grid'>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
  }
  
export default AnimePage;
  