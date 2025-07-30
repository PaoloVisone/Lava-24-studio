import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Componeti
import Overlay from './components/Overlay';
import ScrollToTop from './components/ScrollToTop';

// Layout
import DefaultLayout from './layouts/DefaultLayout';
// Pages
import Home from './pages/Home';
import Progetti from './pages/Progetti';
// Css
import './App.css'



function App() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Overlay isVisible={showOverlay} />
      {!showOverlay && (
        <ScrollToTop>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/progetti" element={<Progetti />} />
            </Route>
          </Routes>
        </ScrollToTop>
      )}
    </BrowserRouter>
  );
}

export default App;

