import { ReactNode } from 'react';

export interface Character {
  id: string;
  name: string;
  gender: string;
  height: string;
  eyeColor: string;
  hairColor: string;
  homeplanet: string;
  homeworld?: string;
  url?: string;
  films: string[];
  starShips: string[];
}
export interface CharacterItemProps {
  character: {
    id: string;
    name: string;
    gender: string;
    homeworld?: string;
    url?: string;
  };
}
export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export interface SearchBarProps {
  onSearch: (term: string) => void;
}
export interface FavouriteCharacter {
  id: string;
  name: string;
  gender: string;
  height?: string;
  homeplanet: string;
}
export interface FavouriteContextProps {
  favourite: FavouriteCharacter[];
  addFavourite: (character: FavouriteCharacter) => void;
  removeFavourite: (id: string) => void;
}
export interface FavouriteContextProviderProps {
  children: ReactNode;
}
