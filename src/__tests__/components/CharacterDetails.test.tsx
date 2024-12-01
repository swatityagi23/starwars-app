import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FavouriteContext } from '../../context/FavouriteContext';
import { MemoryRouter } from 'react-router-dom';
import CharacterDetails from '../../components/CharacterDetails';
import { useCharacter } from '../../shared/hooks';

// Mock the `useCharacter` hook to avoid making actual API calls
jest.mock('../../shared/hooks', () => ({
  useCharacter: jest.fn(),
}));

describe('CharacterDetails Component', () => {
  const mockCharacter = {
    id: '1',
    name: 'Luke Skywalker',
    gender: 'Male',
    homeplanet: 'Tatooine',
    eyeColor: 'Blue',
    hairColor: 'Blonde',
    films: ['A New Hope', 'The Empire Strikes Back'],
    starShips: ['X-Wing Fighter'],
  };

  let mockAddFavourite: jest.Mock;
  let mockRemoveFavourite: jest.Mock;
  let mockFavouriteContextValue: any;

  beforeEach(() => {
    mockAddFavourite = jest.fn();
    mockRemoveFavourite = jest.fn();

    // Default mock context
    mockFavouriteContextValue = {
      favourite: [],
      addFavourite: mockAddFavourite,
      removeFavourite: mockRemoveFavourite,
    };

    (useCharacter as jest.Mock).mockReturnValue(mockCharacter);
  });

  it('should display loading message while character data is being fetched', () => {
    // Mock the `useCharacter` hook to return loading state
    (useCharacter as jest.Mock).mockReturnValue({
      character: null,
      loading: true,
      error: '',
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <FavouriteContext.Provider value={mockFavouriteContextValue}>
          <CharacterDetails />
        </FavouriteContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Loading character details.../i)
    ).toBeInTheDocument();
  });
  it('should display an error message if there is an error fetching the character data', () => {
    // Mock the `useCharacter` hook to return error state
    (useCharacter as jest.Mock).mockReturnValue({
      character: null,
      loading: false,
      error: 'Unable to fetch data from API.',
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <FavouriteContext.Provider value={mockFavouriteContextValue}>
          <CharacterDetails />
        </FavouriteContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Unable to fetch data from API./i)
    ).toBeInTheDocument();
  });

  it('should display character details when character data is successfully fetched', async () => {
    // Mock the `useCharacter` hook to return character data
    (useCharacter as jest.Mock).mockReturnValue({
      character: mockCharacter,
      loading: false,
      error: '',
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <FavouriteContext.Provider value={mockFavouriteContextValue}>
          <CharacterDetails />
        </FavouriteContext.Provider>
      </MemoryRouter>
    );

    // Wait for the character details to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/Male/i)).toBeInTheDocument();
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
      expect(screen.getByText(/Blue/i)).toBeInTheDocument();
      expect(screen.getByText(/Blonde/i)).toBeInTheDocument();
    });
  });

  it('should toggle character between favourite and not favourite when clicking the button', async () => {
    // Mock the `useCharacter` hook to return character data
    (useCharacter as jest.Mock).mockReturnValue({
      character: mockCharacter,
      loading: false,
      error: '',
    });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <FavouriteContext.Provider value={mockFavouriteContextValue}>
          <CharacterDetails />
        </FavouriteContext.Provider>
      </MemoryRouter>
    );

    // Click the 'Add to Favourite' button
    const favouriteButton = screen.getByText(/Add To Favourite/i);
    fireEvent.click(favouriteButton);

    // Ensure addFavourite is called
    expect(mockAddFavourite).toHaveBeenCalledTimes(1);
    expect(mockAddFavourite).toHaveBeenCalledWith(mockCharacter);

    // Now change the favourite list to include the character
    mockFavouriteContextValue.favourite = [mockCharacter];

    // Re-render the component with updated favourite list
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <FavouriteContext.Provider value={mockFavouriteContextValue}>
          <CharacterDetails />
        </FavouriteContext.Provider>
      </MemoryRouter>
    );

    // Click the 'Remove from Favourite' button
    const removeButton = screen.getByText(/Remove From Favourite/i);
    fireEvent.click(removeButton);

    // Ensure removeFavourite is called
    expect(mockRemoveFavourite).toHaveBeenCalledTimes(1);
    expect(mockRemoveFavourite).toHaveBeenCalledWith('1');
  });
});
