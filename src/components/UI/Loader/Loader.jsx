import React from 'react'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{paddingTop: '50px', paddingBottom: '70px'}}>
          <div>
            <div className={styles.spinner} />
          </div>
          <label style={{fontFamily: 'golos-text'}}>Подождите, идет загрузка</label>
        </div>
    </div>
  )
}

export default Loader
