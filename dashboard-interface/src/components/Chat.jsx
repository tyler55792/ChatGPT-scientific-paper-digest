import Header from "./Header.jsx"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"


function Chat() {
    const { id } = useParams();
    const [postObj, setpostObj] = useState({});
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingClass, setLoadingClass] = useState('loading inactive')

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

    const submitClick = async () => {
        const newChatHistory = [...chatHistory, 
            {
                "role": "user",
                "content": query
            },
            {
                "role": "assistant",
                "content": "...Querying..."
            }];
        setChatHistory(newChatHistory);
        setQuery('');
        setLoadingClass('loading');
        
        // send the last 5 messages as context with with current query
        const contextChatHistory = chatHistory.slice(0,-1).slice(-6);
        const queryObj = {
            sourceId: postObj.sourceID,
            messages: [...contextChatHistory, {
                "role": "user",
                "content": query
            }]
        }
        
        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(queryObj)
            });

            if (response.ok) {
                console.log('Query was successful');
                const responseData = await response.json();
                const newChatHistory = [...chatHistory,
                    {
                        "role": "user",
                        content: query
                    },
                    {
                        "role": "assistant",
                        "content": responseData.content
                    }];
                setChatHistory(newChatHistory);
                setLoadingClass('loading inactive')
            } else {
                console.error('Query request failed');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
      <div className="main-chat">
        <Header />
        <div className='chat-body'>
            <object 
                type="application/pdf"
                data={postObj.url}
                className="pdf-box"
            >
            </object>
            <div className="GPT-box">
                <div className="chat-history">
                    {chatHistory.map((obj, index) => (
                        <div key={index} className={obj.role}>
                            <p>{obj.content}</p>
                        </div>
                    ))}
                </div>
                <div className="query-field">
                    <input 
                        type="text" 
                        className="query-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Ask any question..."           
                    />
                    <button onClick={submitClick} className="query-button">
                        Query
                    </button>
                </div>

            </div>
        </div>
      </div>
    )
}
  
export default Chat;