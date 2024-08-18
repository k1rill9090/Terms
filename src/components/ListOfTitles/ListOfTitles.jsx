import React, { useContext, useEffect, useState } from 'react'
import style from './ListOfTitles.module.css'
import { Context } from '../main_page/Articles/ArtMain'

const ListOfTitles = ({getArts}) => {
  const {dataTitles, setFlagTable} = useContext(Context)

  const getArt = (page) => {
    getArts(page)
    // console.log(dataTitles)
  }

  return (
    
    <div className={style.list}>
      <div style={{textAlign: 'center', marginBottom: '20px', fontSize: '18px'}}>Абстракты, где встречается<br/>"{dataTitles.term}"</div>
        
      
            {dataTitles.data.length !== 0

        ?

        <div style={{overflowY: 'scroll',display: 'flex', flexDirection: 'column', gap: '10px'}}>

      {dataTitles.data.map(p => 
      <div className={style.cont} onClick={() => getArt(p.pos)}><div>{p.id}</div><div>{p.title}</div></div>
      )}
        
      </div>
        :

        <div style={{border: '1.5px solid #003f63',borderRadius: '3px', textAlign: 'center', padding: '5px'}}>нет данных</div>
        }

      <div className={style.cont+" "+ style.closeStyle} onClick={() => setFlagTable(false)}>закрыть</div>
    

    </div>
  )
}

export default ListOfTitles