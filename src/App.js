import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import links from "./routes/links.tsx";


const clientPages = [
  {
    element: <HomePage />,
    path: links.client.home
  }
]


function App() {
  return (
  <div className="App">
    <Routes>
      {clientPages.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  </div>
  );
}

export default App;
