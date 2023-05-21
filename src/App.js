import './styles/App.css';
import React, { useState } from 'react'
import Header from './components/UI/Header/Header';
import MyForm from './components/UI/Form/MyForm';
import HighlightTerms from './components/UI/HighlightTerms/HighlightTerms';
import Statistics from './components/UI/Statistics/Statistics';


function App() {
    // состояние, определяющее по числу, какой компонент рендерить в switch case
    const [page, setPage] = useState(0)
    const [resp_form, setRespForm] = useState(null)

    // получить значение от дочернего компонента для отрисовки конкретного компонента
    // numPage - целое число, resp - объекты от get метода /articles
    const getPage = (numPage, resp) => {
        setPage(numPage)
        setRespForm(resp)
    }
    
    return (
        <div>
            <Header/>
            {/* функция немедленного вызова. синтаксис: (func)(). в первых скобках содержимое функции, вторые означают выполнить сейчас. */}
            {(() => {
                switch (page) {
                    case 0:
                        return (
                            <MyForm getNumPage={getPage}/>
                        )
                    case 1:
                        return (
                            <HighlightTerms getNumPage={getPage} articles={resp_form}/>
                        )
                    case 2:
                    return (
                        <Statistics/>
                    )
                    case 3:
                        return (
                            <h1>переход</h1>
                        )
                    default:
                        return (
                            <MyForm getNumPage={getPage}/>
                        )
                }
            })()}
            
        </div>
    )
}

export default App
