import React, { useContext, useEffect, useState } from 'react'
import style from './ListOfTitles.module.css'
import { Context } from '../main_page/Articles/ArtMain'

const ListOfTitles = () => {
  const {dataTitles, setFlagTable} = useContext(Context)

  return (
    <div className={style.list}>
      <div style={{textAlign: 'center', marginBottom: '20px', fontSize: '18px'}}>Абстракты, где встречается<br/>"{dataTitles.term}"</div>
        <div style={{overflowY: 'scroll',display: 'flex', flexDirection: 'column', gap: '10px'}}>
      {/* <div className={style.cont}>заголовок абстракта</div> */}
      {dataTitles.data.map(p => 
      <div className={style.cont}>{p}</div>
      )}
      </div>

      <div className={style.cont+" "+ style.closeStyle} onClick={() => setFlagTable(false)}>закрыть</div>
    </div>
  )
}

export default ListOfTitles