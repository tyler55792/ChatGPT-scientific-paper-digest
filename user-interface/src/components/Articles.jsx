import { useEffect, useState } from "react"
import Article from "./Article.jsx"

function Articles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // GET request
        fetch('https://gpt-backend-kcv6.onrender.com/api/posts')
            .then(response => response.json())
            .then(data => {
                setArticles(data.posts);
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }, [articles]);
    
    return (
        <div className="articles-body">
            <div className='latest-stories'>
                Browse
            </div>
            { articles.map((post) => {
                return <Article 
                    key={ post._id } 
                    title={ post.title } 
                    content={ post.content } 
                    date={ post.date } 
                    id={ post._id } />
            })}
        </div>
    )
}
  
export default Articles;