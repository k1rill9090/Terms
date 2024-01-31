import React, { useState } from 'react'
import parse from 'html-react-parser'
import {Chart} from 'react-google-charts'
import NewButton from '../../components/main_page/NewButton';
import style from './ListOfTerms.module.css';
import axios from 'axios';
import { backend_url } from '../..';
import Loader from '../../components/UI/Loader/Loader';
import ModalLoader from '../../components/UI/ModalLoader/ModalLoader';


export const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];
  
  export const options = {
    chart: {
      title: "Статистика встречаемости терминов"
      // subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
    colors: ['#34529e', '#a62626', '#99ad9c']
  };

const ListOfTerms = () => {

// состояние для лоадера, если true, то появляется элемент компонент данных, если false, то исчезает
  const [isStatLoading, setStatLoading] = useState(false)

  async function checkStat() {
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
    setStatLoading(false) //убрать компонент загрузки данных
    console.log("OK")
    }
  catch {
    alert("error")
  }
  }


  return (
    <div>
      <div className={style.elems}>
        <input></input>
        <NewButton class_new={'listTerms'} onClick={checkStat}>Рассчитать статистику</NewButton>
      </div>
      <div>
      <Chart
            chartType="Bar"
            width="800px"
            height="400px"
            data={data}
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
        
    </div>
  )
}

export default ListOfTerms