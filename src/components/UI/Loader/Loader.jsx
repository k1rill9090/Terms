import React from 'react'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div>
        <div className={styles.spinner}/>
        <label style={{fontFamily: 'golos-text'}}>Подождите, идет загрузка</label>
    </div>
  )
}

export default Loader
