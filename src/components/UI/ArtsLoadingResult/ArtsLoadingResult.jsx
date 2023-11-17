import React from 'react'
import '../../../styles/App.css'
import styles from './ArtsLoadingResult.module.css'
import NewButton from '../../main_page/NewButton'

const ArtsLoadingResult = () => {
  return (
    <div className={styles.mainy}>
        <div className={styles.main}>
            {/* <div style={{alignItems: 'center'}}>
                    <span>Абстракты успешно загружены!</span>
                    
            </div> */}
            <div>
                <p style={{textAlign: 'center'}}>Абстракты загружены!</p>
                <div className={styles.btn}>
                    <NewButton to='/articles'>Посмотреть список абстрактов</NewButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ArtsLoadingResult