import React, { useState } from 'react'
import parse from 'html-react-parser'
import {Chart} from 'react-google-charts'
import NewButton from '../../components/main_page/NewButton';
import style from './ListOfTerms.module.css';
import axios from 'axios';
import { backend_url } from '../..';
import Loader from '../../components/UI/Loader/Loader';
import ModalLoader from '../../components/UI/ModalLoader/ModalLoader';
import Myinput from '../../components/UI/MyInput/MyInput';
import ErrNotification from '../../components/UI/ErrNotification/ErrNotification';
import AccessNotification from '../../components/UI/AccessNotification/AccessNotification';




const ListOfTerms = () => {
  
  const data_1 = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
  ];

  const [data, setData] = useState(
    [
      ["Year", ""]
    ]
  )
  
  const options = {
    chart: {
      title: "Статистика встречаемости терминов"
      // subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
    colors: ['#34529e', '#a62626', '#99ad9c']
  };

  
// состояние для лоадера, если true, то появляется элемент компонент данных, если false, то исчезает
  const [isStatLoading, setStatLoading] = useState(false)
  const [note, setNote] = useState(false) // cостояние для уведомления с ошибкой
  const [noteAccess, setNoteAccess] = useState(false) // cостояние для уведомления об успехе

  // состояние для query параметров GET запроса /statistics
  const [limit, setLimit] = useState(9)

  async function calcStat() {
    // функция для вызова методов по выделению терминов и расчете статистики

    setStatLoading(true) //запустить компонент загрузки данных
    try {
      // вызвать метод POST /terms
      await axios.post(backend_url+'/terms', {
        headers: {
          'ngrok-skip-browser-warning': true
        },
      }
      );
      await axios.post(backend_url+'/statistics', {
        headers: {
          'ngrok-skip-browser-warning': true
        },
      }
      );
      // setStatLoading(false) //убрать компонент загрузки данных
      setTimeout(() => {setStatLoading(false)}, 2000);
      setTimeout(() => {setNoteAccess(true)}, 2000);
      setTimeout(() => {setNoteAccess(false)}, 5000);
      console.log("OK")
    }
    catch {
      setStatLoading(false);
      // ниже вызов уведомления об ошибке
      setNote(true);
      setTimeout(() => {
        setNote(false)
      }, 5000);
    }
  }

  async function getStat(limit) {
    setStatLoading(true) //запустить компонент загрузки данных
    try {
      // вызвать метод GET /statistics
      const responseGetStat = await axios.get(backend_url+'/statistics', {
        headers: {
          'ngrok-skip-browser-warning': true
        },
        params: {
          limit: limit
        }
      }
      );
      setStatLoading(false) //убрать компонент загрузки данных
      console.log(responseGetStat.data.data)
      return responseGetStat.data.data;
    }
    catch {
      setStatLoading(false);

      // ниже вызов уведомления об ошибке
      setNote(true);
      setTimeout(() => {
        setNote(false)
      }, 5000);
    }

    
  }

  function showStat() {
    getStat(limit)
  }

  return (
    <div>
      <div className={style.elems}>
        <Myinput style={{ marginTop: "15px"}} placeholder={"Введите название термина"} type={'text'}/>
        <NewButton style={{
          marginRight: "100px", marginLeft: "10px",
          borderRadius: "5px", fontSize: "14px", padding: "5px", paddingLeft: "15px", paddingRight: "15px", marginTop: "12px"
          }} 
          class_new={'listTerms'}
          onClick={showStat}>
          обновить данные
          </NewButton>

        <NewButton class_new={'listTerms'} onClick={calcStat}>Рассчитать статистику</NewButton>
      </div>
      <div>
      <Chart
            chartType="Bar"
            width="800px"
            height="400px"
            data={data_1}
            options={options}
        />
      {
        isStatLoading
        ?
        <ModalLoader visible={setStatLoading} setVisible={setStatLoading}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Loader msgText={parse("Подождите, идет выделение терминов <br /> и расчет статистики")}/>
        </div>
        </ModalLoader>
        :
        <div></div>

      }
      </div>
      <ErrNotification visible={note} setVisible={setNote} msgText='Не удалось загрузить данные'/>
      <AccessNotification  visible={noteAccess} setVisible={setNoteAccess} msgText='Статистика по терминам рассчитана!'/>
    </div>
  )
}

export default ListOfTerms