import React from 'react';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterList from '../../components/CharacterList';
import { fetchCharacters } from '../../services/api';

jest.mock('../../services/api', () => ({
  fetchCharacters: jest.fn(),
}));
jest.mock('../../components/Pagination', () => () => <div>Pagination</div>);
jest.mock(
  '../../components/SearchBar',
  () =>
    ({ onSearch }: { onSearch: (term: string) => void }) =>
      (
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      )
);

describe('CharacterList Component', () => {
  const mockData = {
    results: [
      {
        name: 'Luke Skywalker',
        gender: 'male',
        height: '172',
        eyeColor: 'blue',
        hairColor: 'blond',
        films: [],
        starShips: [],
        homeworld: '',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'Darth Vader',
        gender: 'male',
        height: '202',
        eyeColor: 'yellow',
        hairColor: 'none',
        films: [],
        starShips: [],
        homeworld: '',
        url: 'https://swapi.dev/api/people/4/',
      },
    ],
    count: 2,
  };
  beforeEach(() => {
    (fetchCharacters as jest.Mock).mockResolvedValue(mockData);
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });
  it('displays characters before fetching data', async () => {
    render(<CharacterList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays characters after fetching data', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      );
    });

    // Wait for characters to be rendered
    await waitFor(() => expect(fetchCharacters).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });

  it('loads the next page of characters when pagination is triggered', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByText('Pagination'));

    await act(async () => {
      await waitFor(() => expect(fetchCharacters).toHaveBeenCalledWith(1, ''));
    });
  });

  it('allows search input to trigger API call', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      );
    });

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Skywalker' } });

    await act(async () => {
      await waitFor(() =>
        expect(fetchCharacters).toHaveBeenCalledWith(1, 'Skywalker')
      );
    });
  });
});
describe('CharacterList Component When API Fails', () => {
  beforeEach(() => {
    (fetchCharacters as jest.Mock).mockRejectedValue(
      new Error('Network error')
    );
  });
  it('display and Error when API fetch fails', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      );
    });

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalledTimes(1));
    expect(
      screen.getByText(/Failed to fetch characters. Please try again later!/i)
    ).toBeInTheDocument();
  });
});
