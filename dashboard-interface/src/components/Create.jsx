import { useState } from 'react';
import Header from "./Header.jsx";

function Create() {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');

    const submitClick = async () => {
        const postObject = {
            date: date,
            title: title,
            content: content,
            url: url,
            featured: false
        }

        try {
            const response = await fetch('https://gpt-backend-kcv6.onrender.com/api/posts', {
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
                setUrl('');
                console.log('Post was successful');
            } else {
                console.error('Post request failed');
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <>
            <Header />
            <div className="articles-body">
                <div className='latest-stories'>
                    Create
                </div>
            </div>
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
                <div className="url-field">
                    <div>URL</div>
                    <textarea 
                        type="text" 
                        className="url-input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
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