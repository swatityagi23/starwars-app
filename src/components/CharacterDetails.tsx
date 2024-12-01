import React, { useContext, useEffect, useState } from 'react';
import { FavouriteContext } from '../context/FavouriteContext';
import { useParams } from 'react-router-dom';
import { useCharacter } from '../shared/hooks';

const CharacterDetails: React.FC = () => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { id } = useParams<{ id: string | undefined }>();
  const { favourite, addFavourite, removeFavourite } =
    useContext(FavouriteContext);

  const { character, loading, error } = useCharacter(id || ' ');
  useEffect(() => {
    if (character) {
      const isFav = favourite.some(
        (favCharacter) => favCharacter.id === character.id
      );
      setIsFavourite(isFav);
    }
  }, [favourite, character]);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-2">
        <p>Loading character details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center my-2">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex justify-center items-center my-2">
        <p>Character Not Found...</p>
      </div>
    );
  }

  const toggleFavourite = () => {
    if (character?.id) {
      // Checks if character is not null and has an id
      if (isFavourite) {
        removeFavourite(character.id);
      } else {
        addFavourite(character);
      }
    }
  };

  return (
    <div className="p-6 rounded-md max-w-xl mx-auto">
      <div className="border-b border-yellow-200 py-2 grid grid-cols-2 gap-4">
        <span className="font-semibold">Name:</span>
        <span>{character.name}</span>
      </div>
      <div className="border-b border-yellow-200 py-2 grid grid-cols-2 gap-4">
        <span className="font-semibold">Gender:</span>
        <span>{character.gender}</span>
      </div>
      <div className="border-b border-yellow-200 py-2 grid grid-cols-2 gap-4">
        <span className="font-semibold">Home Planet:</span>
        <span>{character.homeplanet}</span>
      </div>
      <div className="border-b border-yellow-200 py-2 grid grid-cols-2 gap-4">
        <span className="font-semibold">Eye Color:</span>
        <span>{character.eyeColor}</span>
      </div>
      <div className="border-b border-yellow-200 py-2 grid grid-cols-2 gap-4">
        <span className="font-semibold">Hair Color:</span>
        <span>{character.hairColor}</span>
      </div>
      <div className="border-b border-yellow-200 py-2 grid grid-cols-2 gap-4">
        <span className="font-semibold">Movie Appearances:</span>
        <span>{character?.films?.join(' , ')}</span>
      </div>
      <div className="py-2 border-yellow-200 grid grid-cols-2 gap-4">
        <span className="font-semibold">Starships Piloted:</span>
        <span>{character?.starShips?.join(' , ')}</span>
      </div>
      <button
        type="button"
        onClick={toggleFavourite}
        className="text-yellow-200 text-center hover:text-yellow-500 transition-colors duration-300"
      >
        {isFavourite ? 'Remove From Favourite' : 'Add To Favourite'}
      </button>
    </div>
  );
};

export default CharacterDetails;
