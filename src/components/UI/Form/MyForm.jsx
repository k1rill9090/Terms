import Myinput from '../MyInput/MyInput'
import classes from './Form.module.css'
import MyButton from '../MyButton/MyButton'
// импортируем стили для изменения обводки инпута при валидации
import errStyles from './errStyles.module.css'

const MyForm = (props) => {

// если введенное число в диапазоне, то валидации нет, иначе обводим красным
  const validate = (event) => {
    if ( !(event.target.value >= 1 && event.target.value <= 100)) {
      console.log("Число ЗА ПРЕДЕЛАМИ ДИАПАЗОНА")
      event.target.classList.add(errStyles.error)

    }
    else {
      console.log("число в диапазоне от 0 до 100")
      // проверка на наличие класса error у инпута, если есть, удалить (убрать красную обводку). 
      // нужна так как изменение значения может быть в корректном диапазоне, а удалить несуществующий класс нельзя
      event.target.classList.contains(errStyles.error) ? event.target.classList.remove(errStyles.error) : console.log('ok')
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
              <Myinput placeholder={"Целое число (не более 100)"} type={'number'} onChange={event => validate(event)}/>
            </div>

            <div className={classes.lb_in}>
              <label className={classes.lb}>Поисковая строка</label>
              <Myinput placeholder={"Введите слова через пробел"} type={'text'}/>
            </div>

            <div className={classes.lb_in}>
              <label className={classes.lb}>Дата начала</label>
              <Myinput type={'date'}/>
            </div>

            <div className={classes.lb_in}>
              <label className={classes.lb}>Дата окончания</label>
              <Myinput type={'date'}/>
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
