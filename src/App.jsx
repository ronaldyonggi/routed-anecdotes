import { useState } from "react"
import Menu from './components/Menu'
import About from './pages/About'
import CreateNew from './pages/CreateNew'
import Footer from './components/Footer'
import { Route, Routes, useMatch } from "react-router-dom"
import Home from "./pages/Home"
import Anecdote from "./pages/Anecdote"

function App() {

  const initialAnecdotes = [
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ]

  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const [notification, setNotification] = useState('')

  const addNew = anecdote => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }


  const vote = id => {
    const anecdoteToVote = anecdotes.find(a => a.id === id)

    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id? votedAnecdote : a))
  }

  const idMatch = useMatch('/anecdotes/:id')
  const anecdote = idMatch 
    ? anecdotes.find(a => a.id === Number(idMatch.params.id))
    : null

  return (
    <div>
      <h1>Software Anecdotes</h1>
      <Menu />

      <Routes>
        <Route path="/" element={<Home anecdotes={anecdotes}/>} />
        <Route path="/create" element={<CreateNew addNew={addNew} />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
