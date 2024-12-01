import React, { useContext } from 'react';
import { FavouriteContext } from '../context/FavouriteContext';

const FavouriteList: React.FC = () => {
  const { favourite, removeFavourite } = useContext(FavouriteContext);

  return (
    <div className="mt-4">
      {favourite.length === 0 ? (
        <div className="flex justify-center items-center my-2">
          <p>No Favourite Added yet</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 items-center justify-center">
          {favourite.map((character) => (
            <div
              className="flex-none basis-1/5 max-w-1/5 sm:basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-1/6"
              key={character.id}
            >
              <div className="block bg-[#232323] p-8 text-white perspective-1 translate-z-0 shadow-[0_0_10px_3px_transparent,0_0_10px_black] transition duration-300 overflow-hidden rounded-lg">
                <h1>{character.name}</h1>
                <p>Gender: {character.gender}</p>
                <p>Height: {character.height}</p>
                <p>Home Planet: {character.homeplanet}</p>
                <hr className="bg-white h-px my-3" />
                <button
                  type="button"
                  onClick={() => removeFavourite(character.id)}
                  className="text-yellow-200 text-center hover:text-yellow-500 transition-colors duration-300"
                >
                  Remove From Favourite
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default FavouriteList;
