import { useState } from 'react';
import Header from "./Header.jsx"

function Create() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submitClick = async () => {
        const currentDate = new Date();

        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const year = currentDate.getFullYear();

        const formattedDate = `${month}-${day}-${year}`;

        const postObject = {
            title: title,
            content: content,
            date: formattedDate
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
                setTitle('');
                setContent('');
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
            <button onClick={submitClick} className="create-button">
                Post
            </button>
        </div>
      </>
    )
}
  
export default Create;