import { useState } from 'react';
import Header from "./Header.jsx"

// new use state vars
// new divs for input
// update post object
// update styling

function Create() {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [text, setText] = useState('');

    const submitClick = async () => {
        const postObject = {
            date: date,
            title: title,
            content: content,
            text: text,
            featured: false
        }

        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postObject)
            });

            if (response.ok) {
                setDate('');
                setTitle('');
                setContent('');
                setText('');
                console.log('Post was successful');
            } else {
                console.error('Post request failed');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
      <>
        <Header />
        <div className='create-body'>
            <div className="date-field">
                <div>Date</div>
                <textarea 
                    type="text" 
                    className="date-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="title-field">
                <div>Title</div>
                <textarea 
                    type="text" 
                    className="title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="content-field">
                <div>Content</div>
                <textarea 
                    type="text" 
                    className="content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}            
                />
            </div>
            <div className="text-field">
                <div>Text</div>
                <textarea 
                    type="text" 
                    className="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <button onClick={submitClick} className="create-button">
                Post
            </button>
        </div>
      </>
    )
}
  
export default Create;