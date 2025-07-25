import { Routes, Route } from 'react-router-dom'
import NewsFeed from './NewsFeed'
import ArticleDetails from './ArticleDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsFeed />} />
      <Route path="/article/:id" element={<ArticleDetails />} />
    </Routes>
  )
}

export default App
