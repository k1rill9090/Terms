import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './ArtMain.module.css'
import Title from './Title'
import axios from 'axios';
import Article from './Article';
import { getFirstLastPages, getPageCount, getPagesArray } from '../../../additionalModules/pagination';
import { backend_url } from '../../../index.js';
import Loader from '../../UI/Loader/Loader.jsx';
import ErrNotification from '../../UI/ErrNotification/ErrNotification.jsx';
import Dropdown from '../../Dropdown/Dropdown.jsx';
import ListOfTitles from '../../ListOfTitles/ListOfTitles.jsx';
import ModalLoader from '../../UI/ModalLoader/ModalLoader.jsx';
// import NewButton from '../NewButton';
export const Context = createContext(null) //контекст для списка с заголовками статей






const ArtMain = () => {

  const [title, setTitle] = useState([])
  const [article, setArticle] = useState([])
  const [totalArt, setTotalArt] = useState(0)
  const [limit, setLimit] = useState(1)
  const [offset, setOffset] = useState(0)
  const [isPostsLoading, setPostsLoading] = useState(false)
  const [note, setNote] = useState(false) // cостояние для уведомления с ошибкой
  const [terms, setTerms] = useState({})
  const [flagTable, setFlagTable] = useState(false) //состояние для списка с заголовками статей
  const [dataTitles, setDataTitles] = useState({term: '', data: {}})
  const [input, setInput] = useState('')

    // состояние для модалки
    const [modal, setModal] = useState(false)

// хук useEffect позволяет выполнять различные действия во время работы компонента
// В данном случае он вызывает api для получения списка статей при начале работы компонента (т.е. при загрузке страницы)
  useEffect( () => {
    // console.log('USE EFFECT')
    getArticles(limit, offset)
  }, []) //пустой массив нужен чтобы вызов функции происходил только один раз, при запуске страницы, иначе функция будет выполняться бесконечно

  const navigate = useNavigate()

  async function getArticles(limit, offset = 0, id) {
    setPostsLoading(true);
    try {
      const response = await axios.get(backend_url+'/articles', {
        headers: {
          'ngrok-skip-browser-warning': true
        },
        params: {
          limit: limit,
          offset: offset,
          id: id
        }
      }
      );

      const response_terms = await axios.get(backend_url+'/terms', {
        headers: {
          'ngrok-skip-browser-warning': true
        },
        params: {
          id_art: response.data.data[0].id,
          limit: 1000
        }
      }
      );
      setTerms(response_terms.data)
      // console.log(terms)
      // console.log("Статус: "+response)
      setPostsLoading(false);
      
      setTitle(response.data.data[0])
      setArticle(response.data.data[0])
      setTotalArt(response.data.meta.total_count)
      navigate(`/articles/${response.data.data[0].id}`)
    }
    catch (error) {
      // console.log('Ошибка: ', error.message);
      setPostsLoading(false);
      setNote(true);
      setTimeout(() => {
        setNote(false)
      }, 5000);
      setTotalArt(0)
    }
  }

  let pagesCount = getPageCount(totalArt, limit)
  let firstLastPages = getFirstLastPages(pagesCount) //массив, где первый элемент - первая страница из апи, второй - последняя страница

  let pagesArray = []
  getPagesArray(pagesArray, pagesCount, offset)
  // console.log(pagesArray)

  const changePage = (page, id) => {
    getArticles(limit, page, id);
    setOffset(page)
  }


  async function actions() {
    // chooseTerm(chosenTerm)

    try {
      setModal(true);
        const response = await axios.get(backend_url+'/terms', {
          headers: {
            'ngrok-skip-browser-warning': true
          },
          params: {
            limit: 200000,
            term_name: input
          }
        }
        );
        
        // let idStr = ''
        // response.data.forEach(elem => {
        //   idStr = idStr+'id='+elem.id_art+'&'
        // });

        // код ниже удаляет дубли id-шников
        let idStr = []
        response.data.forEach(elem => {
          idStr.push(elem.id_art)
        });
        let setId = new Set(idStr)
        idStr.length=0

        setId.forEach(elem => {
          idStr.push(`id=${elem}`)
        });
        idStr = idStr.join('&')
        // idStr.push(...setId)
        console.log(idStr)
        

        if (response.data.length !== 0) {
          
        const response_arts = await axios.get(backend_url+`/articles?limit=100000&${idStr}`, {
          headers: {
            'ngrok-skip-browser-warning': true
          }
        }
        );
        // console.log(response_arts.data.data)
        setDataTitles({term: input, data: response_arts.data.data})
        setFlagTable(true);
        // console.log({term: chosenTerm, data: response.data})
        setModal(false)
        window.scrollTo(0, document.body.scrollHeight);
      } 
      else {
        setDataTitles({term: input, data: []})
        // console.log(dataTitles)
        setFlagTable(true);
        setModal(false)
        window.scrollTo(0, document.body.scrollHeight);
      } 
      }
      
      catch (error) {
        // console.log('Ошибка: ', error.message);
        setNote(true);
        setTimeout(() => {
          setNote(false)
        }, 5000);
      }
}
  

  return (
    <div className={styles.main} style={{marginBottom: '5%'}}>
    <ModalLoader visible={modal} setVisible={setModal}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Loader msgText='Подождите, идет загрузка'/>
        </div>
      </ModalLoader>

    <div style={{marginLeft: '40%', marginTop: '20px', display: 'flex', gap: '10px'}}>
      <input placeholder='Укажите название термина' style={{width: '300px'}} onChange={(e) => setInput(e.target.value)}></input>
      <button style={{border: '1px solid black', padding: '5px'}} onClick={() => actions()}>найти</button>
    </div>

        <div className={styles.pos}>
            <span className={styles.elems} style={{fontSize: '20px', marginTop: '1.5%', marginBottom: '1.5%'}}>Список статей</span>
        </div>
        <hr style={{borderTop: '1px solid #003F63'}}/>
        <ErrNotification visible={note} setVisible={setNote} msgText='Не удалось загрузить данные'/>      
        
        {isPostsLoading //добавить анимацию загрузки во время загрузки постов через апи
        
        ? <Loader /> 
        
                
        : <div>
            {totalArt === 0 //проверка на наличие записей, если их нет, выводить соответствующий текст
            ? 
            
            <div className={styles.no_data}>
              <span>Нет данных</span>
            </div>
            :
            <Context.Provider value={{dataTitles, setDataTitles, setFlagTable}}>
              <div>
              
                <Title title={title.title} className={styles.pos} style={{paddingTop: '3%', paddingLeft: '30%', paddingRight: '30%'}}/>
                <br /><br />  
                <Article article={article.article} className={styles.pos} style={{paddingTop: '3%', paddingLeft: '30%', paddingRight: '30%'}}/>

                <div className={styles.dropdown}>
                  
                    <Dropdown terms={terms}/>
                  
                </div>

                <div style={{justifyContent: 'center', display: 'flex'}}>
                {flagTable && (
                  <div>
                    <ListOfTitles getArts={changePage}/>
                  </div>
                )}
                
                </div>

                <div className={styles.page__wrapper}>

                  {/* если страниц больше 5, то отображать в пагинации кнопку в начало, иначе нет */}
                  {pagesArray.length > 5 
                  
                    ?
                    <span className={styles.page} 
                          onClick={() => changePage(firstLastPages[0] - 1)} //p-1 из-за того, что offset начинается с нуля, а нумерация страниц с 1
                      >
                      {'В начало'}
                    </span>
                    :
                    <div />
                  }
                  

                  {pagesArray[0] !== firstLastPages[0]
                  ? 
                  <span style={{padding: '10px'}}>{'...'}</span>
                  :
                  <span></span>
                  }
                  

                  {pagesArray.map(p =>
                  <span className={offset + 1 === p ? styles.page__current : styles.page}
                    onClick={() => changePage(p-1)} //p-1 из-за того, что offset начинается с нуля, а нумерация страниц с 1
                    key={p}>{p}
                  </span>
                  )}

                  {pagesArray[pagesArray.length - 1] !== firstLastPages[1]
                  ? 
                  <span style={{padding: '10px'}}>{'...'}</span>
                  :
                  <span></span>
                  }
                  
                  {/* если страниц больше 5, то отображать в пагинации кнопку в конец, иначе нет */}
                  {pagesArray.length > 5 
                  
                  ?
                  <span className={styles.page}
                      onClick={() => changePage(firstLastPages[1] - 1)} //p-1 из-за того, что offset начинается с нуля, а нумерация страниц с 1
                  >
                  {'В конец'}
                  </span>
                  :
                  <div />
                  }
        
                </div>
              </div>
            </Context.Provider>
            }
          </div>
        }

    </div>
  )
}

export default ArtMain