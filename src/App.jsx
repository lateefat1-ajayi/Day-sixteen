import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/palette" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-center" />
    </>
  );
};

export default App;
