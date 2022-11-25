import { useState, useEffect } from 'react'
import Card from './Card'
import ErrorBoundary from './ErrorBoundary'

export default function App() {
  const [lessonsData, setLessonsData] = useState([])
  const [urlWord, setUrlWord] = useState('')
  const [notFindNotification, setNotFindNotification] = useState('')

  useEffect(() => {
    const getData = async (urlWord) => {
      try {
        const response = await fetch(
          `https://react-course-api.azurewebsites.net/lesson/${urlWord}`
        )
        const data = await response.json()
        setLessonsData(data)
      } catch (error) {
        alert(
          'The server is not available. Please reload the page or try again later'
        )
      }
    }
    if (urlWord) {
      getData(urlWord)
      setNotFindNotification('No lessons by this keyword...')
    }
  }, [urlWord])

  function onBlurHandler(e) {
    setUrlWord(e.target.value)
  }

  return (
    <ErrorBoundary>
      <input
        onBlur={onBlurHandler}
        type="text"
        placeholder="Find the lesson..."
      />
      <div>
        {lessonsData.length > 0 ? (
          <Card lessonsData={lessonsData} />
        ) : (
          <div>{notFindNotification}</div>
        )}
      </div>
    </ErrorBoundary>
  )
}
