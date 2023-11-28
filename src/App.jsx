import { useState } from "react"
import Menu from './pages/Menu'
import AnecdoteList from './pages/AnecdoteList'
import About from './pages/About'
import CreateNew from './pages/CreateNew'
import Footer from './pages/Footer'

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

  return (
    <div>
      <h1>Software Anecdotes</h1>
      <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer />
    </div>
  )
}

export default App
