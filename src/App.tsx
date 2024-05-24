import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './modules/HomePage';
import DishDetailsPage from './modules/DishDetailsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/dish/:name" element={<DishDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
