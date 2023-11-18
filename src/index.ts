import express from 'express';
import path from 'path';
import fs from 'fs';
import { Animelist } from './animelist';
import { convertData_DMDASSCToCurrent } from './oldToNewDataConverter';

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const port = 3000;
const app = express();
const animelist = new Animelist();

function main()
{
  //convertData_DMDASSCToCurrent();
  setupExpress();

  animelist.loadData();

  //createTestAnimes();
}

function createTestAnimes()
{
  const anime1 = animelist.createNewAnime("anime 1");
  anime1.watchedEpisodes = 1;
  anime1.imageUrl = "https://m.timesofindia.com/photo/104762256/104762256.jpg";

  const anime2 = animelist.createNewAnime("anime 2");
  anime2.watchedEpisodes = 1;
  anime2.totalEpisodes = 12;
  anime2.imageUrl = "https://i.pinimg.com/236x/3f/e3/51/3fe351b388fea91a7772dccb60363a05.jpg";

  const anime3 = animelist.createNewAnime("anime 3");
  anime3.watchedEpisodes = 0;
  anime3.totalEpisodes = 0;
  anime3.imageUrl = "https://i.pinimg.com/236x/3f/e3/51/3fe351b388fea91a7772dccb60363a05.jpg";

  const anime4 = animelist.createNewAnime("anime 4");
  anime4.watchedEpisodes = 12;
  anime4.totalEpisodes = 12;
  anime4.imageUrl = "https://i.pinimg.com/236x/3f/e3/51/3fe351b388fea91a7772dccb60363a05.jpg";

  const anime5 = animelist.createNewAnime("anime 3");
  anime5.watchedEpisodes = 1;
  anime5.totalEpisodes = 0;
  anime5.nextEpisodeDate = Date.now() + 200000;
  anime5.imageUrl = "https://i.pinimg.com/236x/3f/e3/51/3fe351b388fea91a7772dccb60363a05.jpg";
}

function setupExpress()
{
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  setupAPI();

  app.use(express.static(path.join(__dirname, '..', '/public')));

  app.use(express.static(path.join(__dirname, '..', '/public', '/client')));

  /*
  app.get('/', (req, res) => {
    res.json({ message: 'hello world with Typescript' });
  })
  */
  
  app.get("*", (req, res) => res.sendFile(path.join(__dirname, '..', '/public', '/client', "index.html")));
  
  app.listen(port, () => {
    console.log('[app] Running on port :' + port);
  })
}

function setupAPI()
{
  app.get('/api/animes', (req, res) => {
    res.json(Array.from(animelist.animes.values()));
  })

  app.get('/api/anime/:id', (req, res) => {
    const id = req.params.id;
    const anime = animelist.animes.get(id);

    console.log(id, anime)

    if(!anime)
    {
      res.sendStatus(500);
      return;
    }

    res.json(anime);
  })

  app.post('/api/anime/:id/delete', (req, res) => {
    const id = req.params.id;
    const anime = animelist.animes.get(id);
    const key = req.body.key;

    if(!authorizeKey(key))
    {
      res.sendStatus(500);
      return;
    }

    console.log(id, anime)

    if(!anime)
    {
      res.sendStatus(500);
      return;
    }

    animelist.deleteAnime(id);
    animelist.saveData();

    res.json({});
  });

  app.post('/api/anime/:id/update', (req, res) => {
    const id = req.params.id;
    const anime = animelist.animes.get(id);
    const newAnimeData = req.body.anime;
    const key = req.body.key;

    if(!authorizeKey(key))
    {
      res.sendStatus(500);
      return;
    }

    console.log(id, newAnimeData)

    if(!anime)
    {
      res.sendStatus(500);
      return;
    }

    anime.name = newAnimeData.name;
    anime.nextEpisodeDate = newAnimeData.nextEpisodeDate;
    anime.totalEpisodes = newAnimeData.totalEpisodes;
    anime.totalOvas = newAnimeData.totalOvas;
    anime.watchedEpisodes = newAnimeData.watchedEpisodes;
    anime.watchedOvas = newAnimeData.watchedOvas;
    anime.lastUpdated = Date.now()
    anime.imageUrl = newAnimeData.imageUrl

    animelist.saveData();

    res.json({});
  });

  app.post('/api/addNewAnime', (req, res) => {
    const key = req.body.key;

    if(!authorizeKey(key))
    {
      res.sendStatus(500);
      return;
    }

    animelist.createNewAnime("Anime");
    animelist.saveData();

    res.json({});
  });

  app.post('/api/uploadDataFile', upload.array("file"), (req: any, res) => {
    console.log(req.body);
    console.log(req.files);
    
    const key = req.body.key;

    if(!authorizeKey(key))
    {
      res.sendStatus(500);
      return;
    }
    
    const file = req.files[0];

    if(fs.existsSync("./.data/animes.json")) fs.rmSync("./.data/animes.json");
    fs.renameSync(file.path, "./.data/animes.json");

    animelist.loadData();

    res.json({ message: "Successfully uploaded files" });
  });

  app.get('/api/downloadDataFile', (req, res) => {
    const file = "./.data/animes.json";
    res.download(file); // Set disposition and send it.
  });
}

function authorizeKey(key: string)
{
  return key === "12345";
}

main();