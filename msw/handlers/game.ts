import { rest } from 'msw'

import { delay } from '../utils/delay'
import { findGameById } from '../utils/prepareGameData'

export const game = rest.post(
  'https://api.retrogames.dev/games/:gameId',
  async (req, res, ctx) => {
    const gameItem = findGameById(Number(req.params.gameId))

    await delay(500)

    return res(ctx.status(200), ctx.json(gameItem))
  },
)
