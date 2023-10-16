import React, { useEffect, useState } from 'react'
import styles from './ArtMain.module.css'
import Title from './Title'
import axios from 'axios';
import Article from './Article';
import { getFirstLastPages, getPageCount, getPagesArray } from '../../../additionalModules/pages';
import NewButton from '../NewButton';







const ArtMain = () => {

  const [title, setTitle] = useState([])
  const [article, setArticle] = useState([])
  const [totalArt, setTotalArt] = useState(0)
  const [limit, setLimit] = useState(1)
  const [offset, setOffset] = useState(0)

// хук useEffect позволяет выполнять различные действия во время работы компонента
// В данном случае он вызывает api для получения списка статей при начале работы компонента (т.е. при загрузке страницы)
  useEffect( () => {
    // console.log('USE EFFECT')
    getArticles(limit, offset)
  }, [])


  async function getArticles(limit = 10, offset = 0) {
    const response = await axios.get('http://127.0.0.1:5000/articles', {
      params: {
        limit: limit,
        offset: offset
      }
    });
    // console.log(response.data)
    setTitle(response.data.data[0])
    setArticle(response.data.data[0])
    setTotalArt(response.data.meta.total_count)
  }

  let pagesCount = getPageCount(totalArt, limit)
  let firstLastPages = getFirstLastPages(pagesCount) //массив, где первый элемент - первая страница из апи, второй - последняя страница

  let pagesArray = []
  getPagesArray(pagesArray, pagesCount, offset)
  // console.log(pagesArray)

  const changePage = (page) => {
    getArticles(limit, page);
    setOffset(page)
  }



  return (
    <div className={styles.main} style={{marginBottom: '5%'}}>
        <div className={styles.pos}>
            <span className={styles.elems} style={{fontSize: '20px', marginTop: '1.5%', marginBottom: '1.5%'}}>Список статей</span>
        </div>
        <hr style={{borderTop: '1px solid #003F63'}}/>
        {/* <div className={styles.pos}>
            <span className={styles.elems} style={{fontSize: '14px'}}>Заголовок</span>
        </div> */}
        <Title title={title.title} className={styles.pos} style={{paddingTop: '3%', paddingLeft: '30%', paddingRight: '30%'}}/>
        <br /><br />
        <Article article={article.article} className={styles.pos} style={{paddingTop: '3%', paddingLeft: '30%', paddingRight: '30%'}}/>

        <div className={styles.page__wrapper}>
            <span className={styles.page} 
                onClick={() => changePage(firstLastPages[0] - 1)} //p-1 из-за того, что offset начинается с нуля, а нумерация страниц с 1
            >
            {'В начало'}
            </span>

            {pagesArray[0] != firstLastPages[0]
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

            {pagesArray[pagesArray.length - 1] != firstLastPages[1]
            ? 
            <span style={{padding: '10px'}}>{'...'}</span>
            :
            <span></span>
            }

            <span className={styles.page}
                onClick={() => changePage(firstLastPages[1] - 1)} //p-1 из-за того, что offset начинается с нуля, а нумерация страниц с 1
            >
            {'В конец'}
            </span>
   
        </div>
    </div>
  )
}

export default ArtMain