console.log('src/renderer/App.tsx loaded');

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.scss';
import { Library } from '../controllers';

let $ = require('jquery');
window.$ = $;
window.jQuery = $;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Library />} />
      </Routes>
    </Router>
  );
}

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate It! ({process.env.NODE_ENV})
          </button>
        </a>
      </div>
    </div>
  );
}
