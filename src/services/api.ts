import axios from 'axios';
import { API_URL } from '../shared/constant';

export const fetchCharacters = async (
  page: number = 1,
  searchTerm: string = ''
) => {
  console.log('Character List API Call');
  const url = searchTerm
    ? `${API_URL}/?search=${searchTerm}`
    : `${API_URL}/?page=${page}`;

  const response = await axios.get(url);
  return response.data;
};
const fetchDetails = async (urls: string[], key: string): Promise<string[]> => {
  try {
    const responses = await Promise.all(
      urls.map(async (url) => {
        const response = await axios.get(url);
        return response.data[key];
      })
    );
    return responses;
  } catch (error) {
    console.error(`Error fetching details from URLs: ${error}`);
    return [];
  }
};
export const fetchAPIData = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    const character = response.data;

    let homeplanet = 'Unknown';
    try {
      const homePlanetResponse = await axios.get(character.homeworld);
      homeplanet = homePlanetResponse.data.name;
    } catch (error) {
      console.warn(`Failed to fetch home planet for character ${id}: ${error}`);
    }
    const [films, starShips] = await Promise.all([
      fetchDetails(character.films, 'title').catch((err) => {
        console.warn(`Failed to fetch films for character ${id}: ${err}`);
        return [];
      }),
      fetchDetails(character.starships, 'name').catch((err) => {
        console.warn(`Failed to fetch starships for character ${id}: ${err}`);
        return [];
      }),
    ]);

    return {
      id,
      name: character.name,
      gender: character.gender,
      eyeColor: character.eye_color,
      hairColor: character.hair_color,
      height: character.height,
      homeplanet,
      films,
      starShips,
    };
  } catch (error) {
    console.error(`Failed to fetch character data for ID ${id}: ${error}`);
    throw new Error('Unable to fetch character data. Please try again.');
  }
};

export const fetchPlanet = async (url: string) => {
  console.log('Planet API Call');
  const response = await axios.get(url);
  return response.data;
};
