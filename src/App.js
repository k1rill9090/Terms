import React from 'react'
import './styles/App.css'
import modStyles from './styles/App.module.css'
import Header from './components/main_page/Header';
import ArtMain from './components/main_page/Articles/ArtMain';



function App() {
  return (
    <div>
      
        <Header />
      <div className={modStyles.mainy}>
        <ArtMain />
      </div>
    </div>

  );
}

export default App;