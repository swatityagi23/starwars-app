import React from 'react';
import { CharacterItemProps } from '../shared/types';
import { Link } from 'react-router-dom';
import { useGetHomePlanet } from '../shared/hooks';

const CharacterItem: React.FC<CharacterItemProps> = ({ character }) => {
  console.log('Character Item ', { character });
  const homePlanet = useGetHomePlanet(character.homeworld || '');
  return (
    <>
      <div className="flex-none basis-1/5 max-w-1/5 sm:basis-1/4 md:basis-1/3 lg:basis-1/5 xl:basis-1/6">
        <div className="block bg-[#232323] p-8 text-white perspective-1 translate-z-0 shadow-[0_0_10px_3px_transparent,0_0_10px_black] transition duration-300 overflow-hidden rounded-lg">
          <p>Name: {character.name}</p>
          <p>Gender: {character.gender}</p>
          <p>Home Planet: {homePlanet}</p>
          <hr className="bg-white h-px my-3" />
          <Link
            to={`/character/${character.id}`}
            className="text-yellow-200 text-center hover:text-yellow-500 transition-colors duration-300"
          >
            More Information
          </Link>
        </div>
      </div>
    </>
  );
};
export default CharacterItem;
