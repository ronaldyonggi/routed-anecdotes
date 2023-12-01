import { useNavigate } from "react-router-dom"
import { useNotificationDispatch } from "../NotificationContext"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const navigate = useNavigate()
    const dispatch = useNotificationDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        dispatch({
            type: 'set',
            payload: `a new anecdote ${content.value} is created!`
        })
        setTimeout(() => {
            dispatch({
                type: 'set',
                payload: ''
            })
        }, 5000);
        navigate('/')
    }

    const handleReset = e => {
        e.preventDefault()
        content.onReset()
        author.onReset()
        info.onReset()
    }

    return (
        <div>
            <h2>Create a New Anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    {/* <input name="content" value={content} onChange={e => setContent(e.target.value)}/> */}
                    <input name="content" {...content}/>
                </div>

                <div>
                    author
                    <input name="author" {...author}/>
                </div>

                <div>
                    url for more info
                    <input name="info" {...info}/>
                </div>
                <button>create</button>
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew