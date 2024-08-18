import React, { useContext, useState } from 'react'
import style from './DropdownElems.module.css'
import { Context } from '../main_page/Articles/ArtMain'
import { backend_url } from '../..'
import axios from 'axios'
import Loader from '../UI/Loader/Loader'
import ModalLoader from '../UI/ModalLoader/ModalLoader'

const DropDownElems = ({chosenTerm}) => {

    const [isShown, setIsShown] = useState(false)
    const {setDataTitles, setFlagTable} = useContext(Context)
    const [note, setNote] = useState(false) // cостояние для уведомления с ошибкой
    const [modal, setModal] = useState(false)
    

    async function actions() {
        window.scrollTo(0, document.body.scrollHeight);
        // chooseTerm(chosenTerm)

        try {
          setModal(true);
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
            
            let idStr = ''
            response.data.forEach(elem => {
              idStr = idStr+'id='+elem.id_art+'&'
            });
            const response_arts = await axios.get(backend_url+`/articles?limit=1000&${idStr}`, {
              headers: {
                'ngrok-skip-browser-warning': true
              }
            }
            );
            console.log(response_arts.data.data)
            await setDataTitles({term: chosenTerm, data: response_arts.data.data})
            await setFlagTable(true);
            // console.log({term: chosenTerm, data: response.data})
            setTimeout(() => {
              setModal(false)
            }, 1000);
          }
          catch (error) {
            // console.log('Ошибка: ', error.message);
            setNote(true);
            setTimeout(() => {
              setNote(false)
            }, 5000);
          }
    }

  return (
    <li>
          <ModalLoader visible={modal} setVisible={setModal}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Loader msgText='Подождите, идет загрузка'/>
          </div>
          </ModalLoader>
        
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