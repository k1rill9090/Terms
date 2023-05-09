import React, { useState } from 'react'
import styles from './HighlightTerms.module.css'
import MyButton from '../MyButton/MyButton'
import BackButton from '../BackButton/BackButton'
import ModalLoader from '../ModalLoader/ModalLoader'
import Loader from '../Loader/Loader'
import axios from 'axios'

const HighlightTerms = ({getNumPage, articles}) => {
  // состояние для модалки
  const [modal, setModal] = useState(false)

  const article = useState(articles)

  const findTerms = async (event) => {
    event.preventDefault()
    
    setModal(true)
    setTimeout( async () => {
      await axios.get('http://jsonplaceholder.typicode.com/posts')
      console.log(article)
      setModal(false)
      getNumPage(2) // отправить значение к родителю (в app.js) для переключения формы на другой компонент
    }, 2000);
  }
  
  return (
    <div>
      <ModalLoader visible={modal} setVisible={setModal}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Loader/>
        </div>
      </ModalLoader>

      <div className={styles.back}>
        <BackButton/>
      </div>
        
      <div className={styles.main_block}>
        <div style={{marginTop: "50px"}}>
          <h1 className={styles.h}>Выделение терминов</h1>
          <MyButton onClick={findTerms}>Выделить термины</MyButton>
        </div>
        <div className={styles.text}>
           <h3 style={{fontFamily: 'golos-text'}}>Выгруженные статьи</h3><br/><br/>
            {article[0].map(art => <div>{art.title}</div>
              
            )}
        </div>
      </div>      
    </div>
  )
}

export default HighlightTerms
