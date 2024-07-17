import React, { useState} from "react";

import style from "./Dropdown.module.css";

const Dropdown = ({terms, ...props}) => {
    // состояние, которое передает открытие/закрытие списка в html
    const [dropdownState, setDropdownState] = useState({ open: false }); 
    // функция, которая меняет состояние через флаг open(открыть/закрыть список)
    const handleDropdownClick = () =>
    setDropdownState({ open: !dropdownState.open });

 return (
    <div>
    <div className={style.container}>
        <button type="button" className={style.button} onClick={handleDropdownClick}>
        <span style={{lineHeight: '29px'}}>Список ключевых слов ({terms.length})</span>
            <div>
            <svg width="30px" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24"></rect>
                <path d="M17 9.5L12 14.5L7 9.5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            </div>
        </button>
        </div>
        {dropdownState.open && (
             <div className={style.dropdown}>
                <ul>
                    {terms.map(p =>
                    <li>{p.term}</li>
                    )}
                </ul>
            </div>
        )}
     </div>
);
}

export default Dropdown