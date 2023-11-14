import React from 'react'
import './styles/App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import About from './pages/About/About'
import Articles from './pages/Articles';
import Header from './components/main_page/Header';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/articles' element={<Articles/>}/>
        <Route path="*" element={<Navigate to="/articles" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;