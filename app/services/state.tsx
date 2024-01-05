import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  type Game,
  type Favorites,
  type ToggleFavorite,
  type Reviews,
  type AppendReview,
  type GlobalStateContextData,
} from './types';

export const GlobalStateContext = createContext<GlobalStateContextData>({
  games: [],
  setGames: (_games: Array<Game>) => undefined,
  favorites: [],
  toggleFavorite: (_gameId: Game['id']) => undefined,
  reviews: {},
  appendReview: (_gameId: Game['id'], _review: string) => undefined,
});

export const GlobalStateProvider = ({children}: PropsWithChildren) => {
  const [games, setGames] = useState<Array<Game>>([]);
  const [favorites, setFavorites] = useState<Favorites>([]);
  const [reviews, setReviews] = useState<Reviews>({});

  const toggleFavorite: ToggleFavorite = useCallback(
    gameId => {
      if (favorites.includes(gameId)) {
        setFavorites(favorites.filter(id => id !== gameId));
      } else {
        setFavorites([...favorites, gameId]);
      }
    },
    [favorites, setFavorites],
  );

  const appendReview: AppendReview = useCallback(
    (gameId, review) => {
      setReviews({
        ...reviews,
        [gameId]: [...(reviews[gameId] || []), review],
      });
    },
    [reviews, setReviews],
  );

  return (
    <GlobalStateContext.Provider
      value={{
        games,
        setGames,
        favorites,
        toggleFavorite,
        reviews,
        appendReview,
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
