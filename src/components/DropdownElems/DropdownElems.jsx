import React, { useContext, useState } from 'react'
import style from './DropdownElems.module.css'
import { Context } from '../main_page/Articles/ArtMain'
import { backend_url } from '../..'
import axios from 'axios'

const DropDownElems = ({chosenTerm, chooseTerm}) => {

    const [isShown, setIsShown] = useState(false)
    const {setDataTitles, setFlagTable} = useContext(Context)
    const [note, setNote] = useState(false) // cостояние для уведомления с ошибкой

    async function actions() {
        window.scrollTo(0, document.body.scrollHeight);
        // chooseTerm(chosenTerm)

        try {
            const response = await axios.get(backend_url+'/terms', {
              headers: {
                'ngrok-skip-browser-warning': true
              },
              params: {
                limit: 10000,
                term_name: chosenTerm
              }
            }
            );
            
            // удаление дублей
            let idsList = []
            response.data.forEach(elem => {
            idsList.push(elem.id_art)
            });
            const idsSet = new Set(idsList)
            let idsList2 = [...idsSet]
            const compareFn = (a, b) => a - b
            // console.log(idsList2.sort(compareFn))

            await setDataTitles({term: chosenTerm, data: idsList2.sort(compareFn)})
            await setFlagTable(true);
            // console.log({term: chosenTerm, data: response.data})
          }
          catch (error) {
            // console.log('Ошибка: ', error.message);
            setNote(true);
            setTimeout(() => {
              setNote(false)
            }, 5000);
            chooseTerm({})
          }
    }

  return (
    <li>
        
    <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        <div style={{border: '1px solid black'}}
            className={style.liButton} 
        >{chosenTerm}</div>
        {isShown && (
            
            <div className={style.elems} onClick={actions}>
                отобразить связанные абстракты
            </div>
            
        )}
    </div>

</li>
  )
}

export default DropDownElems