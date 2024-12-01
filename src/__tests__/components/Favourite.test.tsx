import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavouriteContext } from '../../context/FavouriteContext';
import FavouriteList from '../../components/FavouriteList';

describe('FavouriteList Component', () => {
  let mockRemoveFavourite: jest.Mock;
  let mockFavouriteContextValue: any;

  const mockCharacter = {
    id: '1',
    name: 'Luke Skywalker',
    gender: 'Male',
    height: '1.72m',
    homeplanet: 'Tatooine',
  };

  beforeEach(() => {
    mockRemoveFavourite = jest.fn();

    // Default mock context
    mockFavouriteContextValue = {
      favourite: [mockCharacter], // Initially, the character is in the favourites list
      removeFavourite: mockRemoveFavourite,
    };
  });

  it('renders "No Favourite Added yet" when there are no favourites', () => {
    // Update context to have no favourite characters
    mockFavouriteContextValue.favourite = [];

    render(
      <FavouriteContext.Provider value={mockFavouriteContextValue}>
        <FavouriteList />
      </FavouriteContext.Provider>
    );

    expect(screen.getByText('No Favourite Added yet')).toBeInTheDocument();
  });

  it('renders the favourite characters when there are favourites', () => {
    render(
      <FavouriteContext.Provider value={mockFavouriteContextValue}>
        <FavouriteList />
      </FavouriteContext.Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Height: 1.72m')).toBeInTheDocument();
    expect(screen.getByText('Home Planet: Tatooine')).toBeInTheDocument();
  });

  it('calls removeFavourite when "Remove From Favourite" is clicked', () => {
    render(
      <FavouriteContext.Provider value={mockFavouriteContextValue}>
        <FavouriteList />
      </FavouriteContext.Provider>
    );

    const removeButton = screen.getByText('Remove From Favourite');
    fireEvent.click(removeButton);

    expect(mockRemoveFavourite).toHaveBeenCalledWith(mockCharacter.id);
  });
});
