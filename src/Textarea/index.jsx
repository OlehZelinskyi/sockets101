import './Textarea.css'
import useTextareaChat from '../useTextareaChat'
import { useParams } from 'react-router-dom';

const Textarea = () => {
    const { roomId } = useParams();

    const {textareaValue, updateTextareaValue}  = useTextareaChat(roomId)


    const handleTextareaChange = (event) => {
        updateTextareaValue(event.currentTarget.value)
    }

    return (
        <section>
            <h1 className="heading">Real Time Textarea editor</h1>
            <textarea className={`textarea ${!textareaValue.me ? "highlight" : ""}`} value={textareaValue.value} onChange={handleTextareaChange} />
        </section>
    )
}

export default Textarea