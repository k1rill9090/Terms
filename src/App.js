import React from 'react'
import './styles/App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import About from './pages/About/About'
import Articles from './pages/Articles';
import Header from './components/main_page/Header';
// import MyForm from './components/UI/Form/MyForm'
import App2 from './App2'



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/articles' element={<Articles/>}/>
        <Route path='/listTerms' element={<div style={{display: 'flex', justifyContent: 'center'}}>LIST OF TERMS</div>}/>
        <Route path='/form' element={<App2 />}/>
        <Route path="*" element={<Navigate to="/articles" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;