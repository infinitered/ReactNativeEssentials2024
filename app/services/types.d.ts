import {AppStackParamList} from '../navigators/AppNavigator'

export interface Game {
  id: string
  name: string
  rating: number
  description: string
  imageBackground: string
  image: string
  releaseDate: string
  genre: string
  studio: string
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
