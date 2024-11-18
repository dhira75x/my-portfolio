import connectToDB from './src/services/db.js';
import User from './src/models/user.js';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3333;

app.use(express.json());

/* eslint-env node */
const corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

connectToDB();

app.get('/', (_, res) => {
  res.send('Welcome to your server !');
});

app.post('/check-users', async (req, res) => {
  const { nickname, score, game } = req.body;
  const user = await User.findOne({ nickname: nickname });
  if (user) {
    const gameScore = user.scores.find((s) => s.game === game);
    if (gameScore) {
      if (score > gameScore.score) {
        /* update score and date */
        gameScore.score = score;
        gameScore.date = Date.now();
        await user.save();
        res.status(200).json({ message: `Score updated for ${nickname} (game: ${game})` });
      } else {
        res.status(200).json({ message: `Nothing has been modified for user ${nickname}` });
      }
    } else {
      /* add score */
      user.scores.push({ score: score, game: game });
      await user.save();
      res.status(200).json({ message: `Score added for ${nickname} (game: ${game})` });
    }
  } else {
    /* create user */
    await User.create({
      nickname: nickname,
      scores: [{ score: score, game: game }]
    });
    res.status(201).json({ message: `${nickname} user created` });
  }
});

app.post('/top-users', async (req, res) => {
  const { game, limit } = req.body;
  const result = await User.aggregate([
    { $match: { 'scores.game': game } },
    { $unwind: '$scores' },
    { $match: { 'scores.game': game } },
    { $sort: { 'scores.score': -1 } },
    { $limit: limit },
    { $group: { _id: '$_id', nickname: { $first: '$nickname' }, score: { $max: '$scores.score' } } },
    { $sort: { score: -1 } }
  ]);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
