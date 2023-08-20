import Header from "./Header.jsx"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"


function Chat() {
    const { id } = useParams();
    const [postObj, setpostObj] = useState({});

    useEffect(() => {
        // GET request
        fetch(`http://localhost:3000/api/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                setpostObj(data.post)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, []);

    return (
      <>
        <Header />
        <div className='chat-body'>
            {postObj.url}
        </div>
      </>
    )
}
  
export default Chat;