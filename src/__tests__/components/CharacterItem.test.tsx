import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterItem from '../../components/CharacterItem';
import { useGetHomePlanet } from '../../shared/hooks';

jest.mock('../../shared/hooks', () => ({
  useGetHomePlanet: jest.fn(),
}));

describe('CharacterItem Component', () => {
  const mockCharacter = {
    id: '1',
    name: 'Luke Skywalker',
    gender: 'Male',
    homeworld: 'https://swapi.dev/api/planets/1/',
  };

  beforeEach(() => {
    (useGetHomePlanet as jest.Mock).mockReturnValue('Tatooine');
  });

  it('renders character details correctly', () => {
    render(
      <Router>
        <CharacterItem character={mockCharacter} />
      </Router>
    );
    expect(screen.getByText(/Name: Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Male/)).toBeInTheDocument();
    expect(screen.getByText(/Home Planet: Tatooine/)).toBeInTheDocument();
  });

  it('renders "More Information" link correctly', () => {
    render(
      <Router>
        <CharacterItem character={mockCharacter} />
      </Router>
    );
    const link = screen.getByText('More Information');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/character/1');
  });

  it('navigates to the correct character detail page when the link is clicked', () => {
    render(
      <Router>
        <CharacterItem character={mockCharacter} />
      </Router>
    );

    const link = screen.getByText('More Information');
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/character/1');
  });
});
