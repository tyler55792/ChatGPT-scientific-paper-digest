import Header from "./Header.jsx"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"


function Chat() {
    const { id } = useParams();
    const [postObj, setpostObj] = useState({});
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingClass, setLoadingClass] = useState('loading inactive');
    const chatHistoryRef = useRef(null);

    useEffect(() => {
        // GET request
        fetch(`https://gpt-backend-kcv6.onrender.com/api/posts/${id}`)
            .then(response => response.json())
            .then(data => {
                setpostObj(data.post);
            })
            .catch(error => {
                console.error('Error: ', error);
            })
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, loadingClass]);

    const scrollToBottom = () => {
        chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          submitClick();
        }
      };

    const submitClick = async () => {
        // Don't allow empty query
        if (query === '') return;

        const newChatHistory = [...chatHistory, 
            {
                "role": "user",
                "content": query
            }];
        setChatHistory(newChatHistory);
        setQuery('');
        setLoadingClass('loading');
        
        // Send the last 5 messages as context with new query
        const contextChatHistory = newChatHistory.slice(-6);
        const queryObj = {
            sourceId: postObj.sourceID,
            messages: contextChatHistory
        };
        
        try {
            const response = await fetch('https://gpt-backend-kcv6.onrender.com/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(queryObj)
            });

            if (response.ok) {
                const responseData = await response.json();
                const newChatHistory2 = [...newChatHistory,
                    {
                        "role": "assistant",
                        "content": responseData.content
                    }];
                setChatHistory(newChatHistory2);
                setLoadingClass('loading inactive');
            } else {
                console.error('Query request failed');
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div className="main-chat">
            <Header />
            <div className='chat-body'>
                <object 
                    type="application/pdf"
                    data={ postObj.url }
                    className="pdf-box"
                >
                </object>
                <div className="GPT-box">
                    <div className="chat-history" ref={ chatHistoryRef }>
                        {chatHistory.map((obj, index) => (
                            <div key={ index } className={ obj.role }>
                                <p>{ obj.content }</p>
                            </div>
                        ))}
                        <div className={ loadingClass }>
                            <p>...loading...</p>
                        </div> 
                    </div>
                    <div className="query-field">
                        <input 
                            type="text" 
                            className="query-input"
                            value={ query }
                            onChange={ (e) => setQuery(e.target.value) } 
                            onKeyDown={ handleKeyDown }
                            placeholder="Ask any question..."           
                        />
                        <button onClick={ submitClick } className="query-button">
                            Query
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
  
export default Chat;