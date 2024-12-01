import { useEffect, useState } from 'react';
import { fetchAPIData, fetchPlanet } from '../services/api';
import { Character } from './types';

export const useGetHomePlanet = (url: string) => {
  console.log('Use Hook ton get Home Planet Value');
  const [homePlanet, setHomePlanet] = useState<string>('');
  useEffect(() => {
    const getHomePlanet = async () => {
      try {
        const data = await fetchPlanet(url);
        setHomePlanet(data.name);
      } catch (error) {
        console.log(error);
      }
    };
    getHomePlanet();
  }, [url]);
  return homePlanet;
};
export const useCharacter = (id: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const getCharacter = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchAPIData(id);
        if (data) {
          setCharacter(data);
        } else {
          setError('Character details do not exist!');
        }
      } catch (error) {
        setError('Unable to fetch data from API.');
      } finally {
        setLoading(false);
      }
    };

    getCharacter();
  }, [id]);

  return { character, loading, error };
};
