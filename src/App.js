import './App.css';
import Navigation from './components/Navigation';
import BubbleSort from './components/BubbleSort';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path='/bubble-sort' element={<BubbleSort />} />
        <Route path='*' element={
          <h1>Welcome to Algorithms Demo</h1>
        } />
      </Routes>
    </div>
  );
}

export default App;
