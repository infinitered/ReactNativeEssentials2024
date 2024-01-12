import { Game, PostGamesParams } from './types'

const BASE_URL = 'https://api.retrogames.dev'

async function safeFetch<ResponseT>(
  path: string,
  options?: RequestInit,
): Promise<{ ok: true; data: ResponseT } | { ok: false }> {
  try {
    const response = await fetch(BASE_URL + path, {
      method: 'POST',
      ...options,
    })

    if (!response.ok) {
      return { ok: false }
    }

    const parsed = await response.json()

    if (parsed.error) {
      return { ok: false }
    }

    return { ok: true, data: parsed }
  } catch (error) {
    return { ok: false }
  }
}

export const api = {
  getGames: (params: PostGamesParams = {}) =>
    safeFetch<Game[]>('/games', { body: JSON.stringify(params) }),

  getGame: (id: number) => safeFetch<Game>(`/games/${id}`),
}
