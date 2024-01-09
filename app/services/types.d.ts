import {AppStackParamList} from '../navigators/AppNavigator'

export interface Game {
  id: number
  cover: GameCover
  genres: GameGenre[]
  involvedCompanies: GameInvolvedCompany[]
  name: string
  releaseDates: GameReleaseDate[]
  screenshots: GameCover[]
  summary: string
  totalRating: number
  totalRatingCount: number
  totalRatingStarsRounded: number
}

export interface GameCover {
  id: number
  imageId: string
  imageUrl: string
}

export interface GameGenre {
  id: number
  name: string
}

export interface GameInvolvedCompany {
  id: number
  company: GameGenre
  developer: boolean
  publisher: boolean
}

export interface GameReleaseDate {
  id: number
  date: number
  human: string
  y: number
}

export type SetGames = (games: Array<Game>) => void

export type Favorites = Array<Game['id']>

export type ToggleFavorite = (gameId: Game['id']) => void

export type Reviews = Record<Game['id'], Array<string>>

export type AppendReview = (gameId: Game['id'], review: string) => void

export interface GlobalStateContextData {
  games: Array<Game>
  setGames: SetGames
  favorites: Favorites
  toggleFavorite: ToggleFavorite
  reviews: Reviews
  appendReview: AppendReview
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
