import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import Header from './components/Header';
import CharacterDetails from './components/CharacterDetails';
import FavouriteList from './components/FavouriteList';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/favourites" element={<FavouriteList />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
