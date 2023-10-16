import React from 'react'
import style from './NewButton.module.css'

const NewButton = ({children, ...props}) => {
    return (
      <button {...props} className={style.btn}>
          {children}
      </button>
    )
  }

export default NewButton