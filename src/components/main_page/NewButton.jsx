import React from 'react'
import style from './NewButton.module.css'
import { Link } from 'react-router-dom'

const NewButton = ({children, to, ...props}) => {
    return (
      <div>
        <Link to={to}>
          <button {...props} className={style.btn}>
            {children}
          </button>
        </Link>
        </div>
    )
  }

export default NewButton