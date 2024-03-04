import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import NavBar from './pages/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import Home from './pages/home';
// import NavBar from './pages/NavBar';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//       <div>
//         <Routes>
//           <Route 
//             path='/'
//             element={<Home/>}
//           />
//         </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
// App.js

