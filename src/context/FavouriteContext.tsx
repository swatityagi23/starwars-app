import React, { createContext, useEffect, useState } from 'react';
import {
  FavouriteCharacter,
  FavouriteContextProps,
  FavouriteContextProviderProps,
} from '../shared/types';

export const FavouriteContext = createContext<FavouriteContextProps>({
  favourite: [],
  addFavourite: () => {},
  removeFavourite: () => {},
});

export const FavouriteContextProvider: React.FC<
  FavouriteContextProviderProps
> = ({ children }) => {
  const [favourite, setFavourite] = useState<FavouriteCharacter[]>(() => {
    const storedFavourites = localStorage.getItem('favouriteCharacters');
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });
  useEffect(() => {
    localStorage.setItem('favouriteCharacters', JSON.stringify(favourite));
  }, [favourite]);

  const addFavourite = (character: FavouriteCharacter) => {
    setFavourite((previousFavourites) => {
      console.log(previousFavourites);
      if (
        !previousFavourites.some(
          (favCharacter) => favCharacter.id === character.id
        )
      ) {
        return [...previousFavourites, character];
      }
      return previousFavourites;
    });
  };
  const removeFavourite = (id: string) => {
    setFavourite((previousFavourites) =>
      previousFavourites.filter((favCharacter) => favCharacter.id !== id)
    );
  };
  return (
    <FavouriteContext.Provider
      value={{ favourite, addFavourite, removeFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
