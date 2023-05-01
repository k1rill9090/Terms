import Myinput from '../MyInput/MyInput'
import classes from './Form.module.css'
import MyButton from '../MyButton/MyButton'
// импортируем стили для изменения обводки инпута при валидации
import errStyles from './errStyles.module.css'
import Mylabel from './Mylabel'
import { useState } from 'react'

const MyForm = (props) => {
  // состояния для лейблов с ошибкой
  const [checkNum, setCheckNum] = useState('')
  const [checkWords, setCheckWords] = useState('')
  const [labelDateErrStart, setLabelDateErrStart] = useState('')
  const [labelDateErrEnd, setLabelDateErrEnd] = useState('')

  // флаги об активности валидации для кнопки. Если false, значит валидация неактивна
  let isNumErr = false
  let isWordErr = false
  let isMinDateErr = false
  let isMaxDateErr = false

// если введенное число в диапазоне, то валидации нет, иначе обводим красным
  const validate_num = (event) => {
    if ( !(event.value >= 1 && event.value <= 100)) {
      event.classList.add(errStyles.error)
      setCheckNum('Введите целое число от 1 до 100')
      isNumErr = true
    }
    else {
      setCheckNum('')
      // проверка на наличие класса error у инпута, если есть, удалить (убрать красную обводку). 
      // нужна так как изменение значения может быть в корректном диапазоне, а удалить несуществующий класс нельзя
      if ( event.classList.contains(errStyles.error) ) {
        event.classList.remove(errStyles.error)
        setCheckNum('')
        isNumErr = false
      } 
    }    
  }

  // валидация для текстового инпута на наличие только букв и не более 3-х слов
  const validate_words = (event) => {
    if ( !(event.value !== "" && /^[a-zA-Z\s]+$/g.test(event.value) && event.value.split(" ").length <= 3)) {
      event.classList.add(errStyles.error)
      setCheckWords('Введите не более 3 слов через пробел, состоящих только из английских букв')
      isWordErr = true
    }
    else {
      // проверка на наличие класса error у инпута, если есть, удалить (убрать красную обводку). 
      // нужна так как изменение значения может быть в корректном диапазоне, а удалить несуществующий класс нельзя
      if ( event.classList.contains(errStyles.error) )  event.classList.remove(errStyles.error)
      setCheckWords('')
      isWordErr = false
    }    
  }

  const validate_min_date = (event) => {
    // если ошибка валидации на минимальную дату
    if ( !(event.value !== "" && new Date(event.value) > new Date("1800-01-01")) ) {
      if ( new Date(event.value) <= new Date(document.getElementById('max_date').value) ) {
        // проверка даты окончания max_date(небольшой костыль, но так хотя бы работает)
        document.getElementById('max_date').classList.remove(errStyles.error)
        setLabelDateErrEnd('')
        isMaxDateErr = false
      }
      setLabelDateErrStart('Введите дату не ранее 01.01.1800') 
      event.classList.add(errStyles.error)
      isMinDateErr = true
    }
    
    // также костыль с проверкой max_date
    else if (document.getElementById('max_date').value === '') {
      if ( event.value !== '') {
        document.getElementById('min_date').classList.remove(errStyles.error)
        setLabelDateErrStart('')
        isMinDateErr = false
      }
      setLabelDateErrEnd('Введите дату окончания') 
      document.getElementById('max_date').classList.add(errStyles.error)
      isMaxDateErr = true
    }

    else if (new Date(event.value) > new Date(document.getElementById('max_date').value) ) {
      if (new Date(event.value) > new Date("1800-01-01")) {
        document.getElementById('min_date').classList.remove(errStyles.error)
        setLabelDateErrStart('')
        isMinDateErr = false
      }
      setLabelDateErrEnd('Дата окончания не может быть меньше даты начала!')
      document.getElementById('max_date').classList.add(errStyles.error)
      isMaxDateErr = true
    }
    // если нет ошибки валидации
    else {
      // для снятия валидации в случае если дату начала выбрать меншьше даты окончания после того как была ошибка
      if ( new Date(event.value) <= new Date(document.getElementById('max_date').value) ) {
        document.getElementById('max_date').classList.remove(errStyles.error)
        setLabelDateErrEnd('')
        isMaxDateErr = false
      } 

      if ( event.classList.contains(errStyles.error) ) {
        event.classList.remove(errStyles.error)
        setLabelDateErrStart('')
        isMinDateErr = false
      } 
    }
  }

  const validate_max_date = (event) => {
    if ( !(event.value !== "" && new Date(event.value) > new Date("1800-01-01")) ) {
      setLabelDateErrEnd('Введите дату не ранее 01.01.1800')
      event.classList.add(errStyles.error)
      isMaxDateErr = true
    }

    // также костыль с проверкой на min_date
    else if (document.getElementById('min_date').value === '') {
      if ( event.value !== '' ) {
        document.getElementById('max_date').classList.remove(errStyles.error)
        setLabelDateErrEnd('')
        isMaxDateErr = false
      }
      // labelDateMin = 'Введите дату начала'
      document.getElementById('min_date').classList.add(errStyles.error)
      setLabelDateErrStart('Введите дату начала')
      isMinDateErr = true
    }

    else if ( new Date(event.value) < new Date(document.getElementById('min_date').value) ) {
      // labelDateMax = 'Дата окончания не может быть меньше даты начала!(max_date)'
      event.classList.add(errStyles.error)
      setLabelDateErrEnd('Дата окончания не может быть меньше даты начала!')
      isMaxDateErr = true
    }
    else {
      if ( event.classList.contains(errStyles.error) ) {
        event.classList.remove(errStyles.error)
        setLabelDateErrEnd('')
        isMaxDateErr = false
      } 
    }

  }

  const postForm = (a) => {
    // предотвратить обновление страницы при нажатии на кнопку
    a.preventDefault()
    validate_num(document.getElementById('num'))
    validate_words(document.getElementById('words'))
    validate_min_date(document.getElementById('min_date'))
    validate_max_date(document.getElementById('max_date'))

    if (!isNumErr && !isWordErr && !isMinDateErr && !isMaxDateErr) {
      alert('Все поля заполнены корректно, можно отправлять запрос!')

    }

    
  }

  return (
    <div style={{marginTop: '60px'}}>
      <form className={classes.pos}>
        <div className={classes.space}>
            <h1 className={classes.h}>Формирование корпуса текстов</h1>
            <div className={classes.lb_in}>
              <label className={classes.lb}>Количество статей</label>
              <div style={{width: '100%', textAlign: 'center'}}>
                <Myinput id='num' placeholder={"Целое число (не более 100)"} type={'number'} onChange={event => validate_num(event.target)}/>
                <Mylabel>{checkNum}</Mylabel>
              </div>
              
            </div>

            <div className={classes.lb_in}>
              <label className={classes.lb}>Поисковая строка</label>
              <div style={{width: '100%', textAlign: 'center'}}>
                <Myinput id='words' placeholder={"Введите слова через пробел"} type={'text'} onChange={event => validate_words(event.target)}/>
                <Mylabel>{checkWords}</Mylabel>
              </div>
            </div>

            <div className={classes.lb_in}>
              <label className={classes.lb}>Дата начала</label>
              <div style={{width: '100%', textAlign: 'center'}}>
                <Myinput id='min_date' type={'date'} onChange={event => validate_min_date(event.target)}/>
                <Mylabel>{labelDateErrStart}</Mylabel>
              </div>

            </div>

            <div className={classes.lb_in}>
              <label className={classes.lb}>Дата окончания</label>
              <div style={{width: '100%', textAlign: 'center'}}>
                <Myinput id='max_date' type={'date'} onChange={event => validate_max_date(event.target)}/>
                <Mylabel>{labelDateErrEnd}</Mylabel>
              </div>

            </div>

            <div className={classes.lb_in}>
              <MyButton  onClick={postForm}>Найти термины</MyButton>
            </div>
            
          </div>
      </form>
    </div>
    
  )
}

export default MyForm
