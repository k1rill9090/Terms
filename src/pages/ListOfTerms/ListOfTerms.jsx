import React from 'react'
import {Chart} from 'react-google-charts'
import NewButton from '../../components/main_page/NewButton';
import style from './ListOfTerms.module.css';


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
  return (
    <div>
      <div className={style.elems}>
        <input></input>
        <NewButton class_new={'listTerms'}>Рассчитать статистику</NewButton>
      </div>
        <Chart
            chartType="Bar"
            width="800px"
            height="400px"
            data={data}
            options={options}
        />
    </div>
  )
}

export default ListOfTerms