import './App.css';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import BubbleSort from './components/Sorting/BubbleSort';
import InsertionSort from './components/Sorting/InsertionSort';
import MergeSort from './components/Sorting/MergeSort';
import QuickSort from './components/Sorting/QuickSort';
import SelectionSort from './components/Sorting/SelectionSort';
import BinarySearch from './components/Searching/BinarySearch';
import LinearSearch from './components/Searching/LinearSearch';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path='/bubble-sort' element={<BubbleSort />} />
        <Route path='/insertion-sort' element={<InsertionSort />} />
        <Route path='/merge-sort' element={<MergeSort />} />
        <Route path='/quick-sort' element={<QuickSort />} />
        <Route path='/selection-sort' element={<SelectionSort />} />

        <Route path='/binary-search' element={<BinarySearch />} />
        <Route path='/linear-search' element={<LinearSearch />} />

        <Route path='*' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
