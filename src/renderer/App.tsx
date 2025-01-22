import React from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Library } from '../controllers';
import './App.scss';

// import('./vendors/jquery-ui.min.js');
// import('./vendors/jszip.min.js');
// import('./vendors/epub.js');
// import('./vendors/reader.js');
require('./vendors/lib.js');

console.log('src/renderer/App.tsx loaded');

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Library />} />
      </Routes>
    </Router>
  );
}
