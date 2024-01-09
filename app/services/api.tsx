import {Game} from './types'

const BASE_URL = 'https://a6f9e791-ae6a-4a83-a4df-0d5dca932634.mock.pstmn.io'

async function safeFetch<ResponseT>(
  path: string,
  options?: RequestInit,
): Promise<{ok: true; data: ResponseT} | {ok: false}> {
  try {
    const response = await fetch(BASE_URL + path, options)

    if (!response.ok) {
      return {ok: false}
    }

    const parsed = await response.json()

    if (parsed.error) {
      return {ok: false}
    }

    return {ok: true, data: parsed}
  } catch (error) {
    return {ok: false}
  }
}

export const api = {
  getGames: () => safeFetch<Game[]>('/games'),
  getGame: (id: number) => safeFetch<Game>(`/games/${id}`),
}
