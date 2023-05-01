import Myinput from '../MyInput/MyInput'
import classes from './Form.module.css'
import MyButton from '../MyButton/MyButton'
// импортируем стили для изменения обводки инпута при валидации
import errStyles from './errStyles.module.css'
import Mylabel from './Mylabel'
import { useState } from 'react'

const MyForm = (props) => {
  const [checkNum, setCheckNum] = useState('')
  const [checkWords, setCheckWords] = useState('')
  const [labelDateErrStart, setLabelDateErrStart] = useState('')
  const [labelDateErrEnd, setLabelDateErrEnd] = useState('')

// если введенное число в диапазоне, то валидации нет, иначе обводим красным
  const validate_num = (event) => {
    if ( !(event.target.value >= 1 && event.target.value <= 100)) {
      event.target.classList.add(errStyles.error)
      setCheckNum('Введите целое число от 1 до 100')
    }
    else {
      setCheckNum('')
      // проверка на наличие класса error у инпута, если есть, удалить (убрать красную обводку). 
      // нужна так как изменение значения может быть в корректном диапазоне, а удалить несуществующий класс нельзя
      if ( event.target.classList.contains(errStyles.error) ) {
        event.target.classList.remove(errStyles.error)
        setCheckNum('')
      } 
    }    
  }

  // валидация для текстового инпута на наличие только букв и не более 3-х слов
  const validate_words = (event) => {
    if ( !(event.target.value !== "" && /^[a-zA-Z\s]+$/g.test(event.target.value) && event.target.value.split(" ").length <= 3)) {
      event.target.classList.add(errStyles.error)
      setCheckWords('Введите не более 3 слов через пробел, состоящих только из английских букв')
    }
    else {
      // проверка на наличие класса error у инпута, если есть, удалить (убрать красную обводку). 
      // нужна так как изменение значения может быть в корректном диапазоне, а удалить несуществующий класс нельзя
      if ( event.target.classList.contains(errStyles.error) )  event.target.classList.remove(errStyles.error)
      setCheckWords('')
    }    
  }

  const validate_min_date = (event) => {
    // если ошибка валидации на минимальную дату
    if ( !(event.target.value !== "" && new Date(event.target.value) > new Date("1800-01-01")) ) {
      setLabelDateErrStart('Введите дату не ранее 01.01.1800') 
      event.target.classList.add(errStyles.error)
    }
    
    else if (document.getElementById('max_date').value === '') {
      setLabelDateErrEnd('Введите дату окончания') 
      document.getElementById('max_date').classList.add(errStyles.error)
    }

    else if (new Date(event.target.value) > new Date(document.getElementById('max_date').value) ) {
      setLabelDateErrEnd('Дата окончания не может быть меньше даты начала!')
      document.getElementById('max_date').classList.add(errStyles.error)
    }
    // если нет ошибки валидации
    else {
      // для снятия валидации в случае если дату начала выбрать меншьше даты окончания после того как была ошибка
      if ( new Date(event.target.value) <= new Date(document.getElementById('max_date').value) ) {
        document.getElementById('max_date').classList.remove(errStyles.error)
        setLabelDateErrEnd('')
      } 

      if ( event.target.classList.contains(errStyles.error) ) {
        event.target.classList.remove(errStyles.error)
        setLabelDateErrStart('')
      } 
    }
  }

  const validate_max_date = (event) => {
    if ( !(event.target.value !== "" && new Date(event.target.value) > new Date("1800-01-01")) ) {
      setLabelDateErrEnd('Введите дату не ранее 01.01.1800')
      event.target.classList.add(errStyles.error)
    }

    else if (document.getElementById('min_date').value === '') {
      // labelDateMin = 'Введите дату начала'
      document.getElementById('min_date').classList.add(errStyles.error)
      setLabelDateErrStart('Введите дату начала')
    }

    else if ( new Date(event.target.value) < new Date(document.getElementById('min_date').value) ) {
      // labelDateMax = 'Дата окончания не может быть меньше даты начала!(max_date)'
      event.target.classList.add(errStyles.error)
      setLabelDateErrEnd('Дата окончания не может быть меньше даты начала!')
    }
    else {
      if ( event.target.classList.contains(errStyles.error) ) {
        event.target.classList.remove(errStyles.error)
        setLabelDateErrEnd('')
      } 
    }

  }

  const alrt = (a) => {
    // предотвратить обновление страницы при нажатии на кнопку
    a.preventDefault()
    alert("hello world")
    
  }

  return (
    <div style={{marginTop: '60px'}}>
      <form className={classes.pos}>
        <div className={classes.space}>
            <h1 className={classes.h}>Формирование корпуса текстов</h1>
            <div className={classes.lb_in}>
              <label className={classes.lb}>Количество статей</label>
              <div style={{width: '100%', textAlign: 'center'}}>
                <Myinput placeholder={"Целое число (не более 100)"} type={'number'} onChange={event => validate_num(event)}/>
                <Mylabel>{checkNum}</Mylabel>
              </div>
              
            </div>

            <div className={classes.lb_in}>
              <label className={classes.lb}>Поисковая строка</label>
              <div style={{width: '100%', textAlign: 'center'}}>
                <Myinput placeholder={"Введите слова через пробел"} type={'text'} onChange={event => validate_words(event)}/>
                <Mylabel>{checkWords}</Mylabel>
              </div>
            </div>

            <div className={classes.lb_in}>
              <label className={classes.lb}>Дата начала</label>
              <div style={{width: '100%', textAlign: 'center'}}>
                <Myinput id='min_date' type={'date'} onChange={event => validate_min_date(event)}/>
                <Mylabel>{labelDateErrStart}</Mylabel>
              </div>

            </div>

            <div className={classes.lb_in}>
              <label className={classes.lb}>Дата окончания</label>
              <div style={{width: '100%', textAlign: 'center'}}>
                <Myinput id='max_date' type={'date'} onChange={event => validate_max_date(event)}/>
                <Mylabel>{labelDateErrEnd}</Mylabel>
              </div>

            </div>

            <div className={classes.lb_in}>
              <MyButton  onClick={alrt}>Найти термины</MyButton>
            </div>
            
          </div>
      </form>
    </div>
    
  )
}

export default MyForm
