import React from 'react'
import style from './NewButton.module.css'
import { Link } from 'react-router-dom'

const NewButton = ({children, ...props}) => {
    return (
      <div>
        <Link to={props.to}>
          <button {...props} className={style.btn}>
            {children}
          </button>
        </Link>
        </div>
    )
  }

export default NewButton