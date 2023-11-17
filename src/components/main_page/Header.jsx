import React, { useState } from 'react'
import Logo from './Logo';
import styles from './Header.module.css';
import NewButton from './NewButton';
import ModalLoader from '../UI/ModalLoader/ModalLoader';
import { backend_url } from '../..';
import axios from 'axios';
import ErrNotification from '../UI/ErrNotification/ErrNotification';
import Loader from '../UI/Loader/Loader';
import AccessNotification from '../UI/AccessNotification/AccessNotification';


function Header() {

  // состояние для модалки
  const [modal, setModal] = useState(false)
  // cостояние для уведомления с ошибкой
  const [note, setNote] = useState(false)
  // cостояние для уведомления об успехе
  const [noteAccess, setNoteAccess] = useState(false)

  const [active, setActive] = useState({arts: true, list: false, load: false, about: false})

  const handleClick = (e) => {
    
    const dct = {};
    for (const key in active) {
        if (e.target.id === key) {
          dct[key] = true
        }
        else {
          dct[key] = false
        }
      }
    
    setActive(dct);
  }

  // функция по вызову апи удаления постов. Для кнопки удаления.
  // При запуске открывается модалка и при завершении появляется уведомление об успехе или неудаче
  const clearDb = async () => {
      // предотвратить обновление страницы при нажатии на кнопку
      // a.preventDefault()      
      setModal(true)
      try {
          const resp = await axios.delete(backend_url+'/clearPubmedArticles', {headers: {'ngrok-skip-browser-warning': true}});
          // console.log("Метод delete. Статус = "+resp.status);
          setTimeout(() => {setModal(false)}, 2000);
          setTimeout(() => {setNoteAccess(true)}, 2000);
          setTimeout(() => {setNoteAccess(false)}, 5000);
      } catch(err) {
          console.log(err)
          setModal(false)
          setNote(true)
          setTimeout(() => {
              setNote(false)
          }, 5000);
      }    
  }


  return (
    <div style={{marginLeft: "10%", marginRight: "10%"}}>
      <div className={styles.header}>
        <ModalLoader visible={modal} setVisible={setModal}><Loader msgText='Очистка БД'/></ModalLoader>
        <AccessNotification  visible={noteAccess} setVisible={setNoteAccess} msgText='База данных очищена!'/>
        <ErrNotification visible={note} setVisible={setNote} msgText='Не удалось очистить БД'/>
        <div className={styles.main}>
          <Logo/>

            <div className={active.arts ? styles.totalBtn+' '+ styles.active : styles.totalBtn}>
            <NewButton id='arts' to='/articles' onClick={handleClick}>
              Список статей
            </NewButton>
            </div>

            <div className={active.list ? styles.totalBtn+' '+ styles.active : styles.totalBtn}>
            <NewButton id='list' to='/listTerms' onClick={handleClick}>список терминов</NewButton>
            </div>

            <div className={active.load ? styles.totalBtn+' '+ styles.active : styles.totalBtn}>
            <NewButton id='load' to='/form' onClick={handleClick}>
              Загрузить статьи
            </NewButton>
            </div>

            <button className={styles.clearBtn} onClick={clearDb}>Очистить данные</button>
        </div>

        <div style={{marginRight: '15%'}} className={active.about ? styles.totalBtn+' '+ styles.active : styles.totalBtn}>
          <NewButton id='about' to='/about' onClick={handleClick}>
            О сайте
          </NewButton>
        </div>

      </div>
      <hr style={{borderTop: '1px solid #003F63'}}/>
    </div>
  )
}

export default Header
