import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div>
        <Routes>
          <Route 
            path='/'
            element={<Home/>}
          />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
