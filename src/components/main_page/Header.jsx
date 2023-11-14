import React from 'react'
import Logo from './Logo';
import styles from './Header.module.css';
import NewButton from './NewButton';

function Header() {
  return (
    <div style={{marginLeft: "10%", marginRight: "10%"}}>
      <div className={styles.header}>
        
        <div className={styles.main}>
          <Logo/>
          <NewButton to='/articles'>Список статей</NewButton>
          <NewButton>список терминов</NewButton>
          <NewButton>Загрузить термины</NewButton>
        </div>
        <div style={{marginRight: '15%'}}>
          <NewButton to='/about'>О сайте</NewButton>
        </div>
        

      </div>
      <hr style={{borderTop: '1px solid #003F63'}}/>
    </div>
  )
}

export default Header
