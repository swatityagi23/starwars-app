import React, { useEffect, useState } from 'react';
import CharacterItem from './CharacterItem';
import { Character } from '../shared/types';
import { fetchCharacters } from '../services/api';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { getId } from '../shared/utils';

const CharacterList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [character, setCharacter] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const getCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters(currentPage, searchTerm);
        const characterList = data.results.map((character: Character) => ({
          ...character,
          id: getId(character.url || ''),
        }));
        setCharacter(characterList);
        if (searchTerm.trim()) {
          setTotalPages(1);
          setCurrentPage(1);
        } else {
          setTotalPages(Math.ceil(data.count / 10));
        }
      } catch (error) {
        console.log('Failed to Fetch', error);
        setError('Failed to fetch characters. Please try again later!');
      } finally {
        setLoading(false);
      }
    };
    getCharacter();
  }, [currentPage, searchTerm]);
  return (
    <div>
      <SearchBar onSearch={(term) => setSearchTerm(term)} />
      {loading ? (
        <div className="flex justify-center items-center my-2">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center my-2">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-8 items-center justify-center">
            {character.map((character) => (
              <CharacterItem key={character.id} character={character} />
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default CharacterList;
