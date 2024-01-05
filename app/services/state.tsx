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
  type GameContextData,
} from './types';

export const GameContext = createContext<GameContextData>({
  games: [],
  setGames: (_games: Array<Game>) => undefined,
  favorites: [],
  toggleFavorite: (_gameId: Game['id']) => undefined,
  reviews: {},
  appendReview: (_gameId: Game['id'], _review: string) => undefined,
});

export const GameProvider = ({children}: PropsWithChildren) => {
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
    <GameContext.Provider
      value={{
        games,
        setGames,
        favorites,
        toggleFavorite,
        reviews,
        appendReview,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
