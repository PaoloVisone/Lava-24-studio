import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// Componeti
import Overlay from './components/Overlay';
import ScrollToTop from './components/ScrollToTop';
import GlobalScrollbarStyles from './components/CustomScrollbarStyles';
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
    <Router>
      <GlobalScrollbarStyles />
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
    </Router>
  );
}

export default App;

