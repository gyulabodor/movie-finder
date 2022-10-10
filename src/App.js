import { useEffect } from 'react';
import './App.css';

export default function App() {

  useEffect(() => {
    document.title = "Movie Finder";
  })

  return (
    <div className="App">
      <h1>Movie Finder</h1>
      
    </div>
  );
}


