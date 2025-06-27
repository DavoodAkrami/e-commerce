import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import links from "./routes/links.tsx";
import Layout from './Layout/Layout/Layout.jsx';
import AuthPage from "./Pages/AuthPage/AuthPage.jsx"


export const clientPages = [
  {
    element: <HomePage />,
    path: links.client.home
  },
  {
    element: "",
    path: links.client.cart
  },
  {
    element: <AuthPage />,
    path: links.client.auth
  },
  {
    element: "",
    path: links.client.profile
  },
  {
    element: "productDetailedPage",
    path: links.client.product
  }
]


function App() {
  return (
  <div className="App">
    <Routes>
        <Route path='/' element={<Layout />}>
          {clientPages.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
    </Routes>
  </div>
  );
}

export default App;
