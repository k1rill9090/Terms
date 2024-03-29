import React from 'react'
import style from './MyButton.module.css'

// {children, ...props}, здесь children = {children: найти термины}, ...props = {disabled: true}
// такая штука называется деструктуризацией, где записываются элементы объекта в "свернутом" виде через запятую
// если деструктурируем массив, записываем элементы в квадратных скобках, если объект (словарь), то в фигурных
// и еще кое-что: при деструктуризации массива в квадратных скобках можно указывать любое значение, все равно элементы будут определяться по порядку
// а вот при деструктуризации объекта в фигурных скобках записываем ключи элементов, ну или любое название для среза массива через ...
const MyButton = ({children, ...props}) => {
  return (
    <button {...props} className={style.btn}>
        {children}
    </button>
  )
}

export default MyButton
