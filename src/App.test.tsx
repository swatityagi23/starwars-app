import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking child components
jest.mock('./components/CharacterList', () => () => (
  <div>CharacterList Component</div>
));
jest.mock('./components/CharacterDetails', () => () => (
  <div>CharacterDetails Component</div>
));
jest.mock('./components/FavouriteList', () => () => (
  <div>FavouriteList Component</div>
));
jest.mock('./components/Header', () => () => <div>Header Component</div>);

describe('App Component', () => {
  it("renders CharacterList component when navigating to '/'", () => {
    render(<App />);

    // Check if the CharacterList component is displayed
    expect(screen.getByText('CharacterList Component')).toBeInTheDocument();
  });

  it('renders Header component on all routes', () => {
    render(<App />);

    // Check if the Header component is displayed
    expect(screen.getByText('Header Component')).toBeInTheDocument();
  });
});
