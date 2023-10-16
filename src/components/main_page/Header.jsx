import React from 'react'
import Logo from './Logo';
import styles from './Header.module.css';
import NewButton from './NewButton';

function Header() {
  return (
    <div style={{marginLeft: "10%", marginRight: "10%"}}>
      <div className={styles.header}>
        <Logo/>
        <NewButton style={{marginLeft: '5%'}}>Список статей</NewButton>
        <NewButton>список терминов</NewButton>
        <NewButton>Загрузить термины</NewButton>
        <NewButton  style={{marginLeft: '30%'}}>О сайте</NewButton>

      </div>
      <hr style={{borderTop: '1px solid #003F63'}}/>
    </div>
  )
}

export default Header
