import { useEffect, useState } from "react"
import Article from "./Article.jsx"

function Articles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // GET request
        fetch('http://localhost:3000/api/posts')
            .then(response => response.json())
            .then(data => {
                setArticles(data.posts)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [articles]);

    const deleteClick = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/posts/${id}`,
                {method:"DELETE"});
            if (response.ok) {
                //update page
                const updatedArticles = articles.filter(article => article.id !== id);
                setArticles(updatedArticles);
                console.log('Delete was successful');
            } else {
                console.error('Delete request failed');
            }
        } catch (e) {
            console.log('Error:', e)
        }
    }

    return (
      <div className="articles-body">
        <div className='latest-stories'>
            Latest Stories
        </div>
        {articles.map((post) => {
            return <Article 
                key={post._id} 
                title={post.title} 
                content={post.content} 
                date={post.date} 
                id={post._id} 
                deleteClick={deleteClick}/>
        })}
      </div>
    )
}
  
export default Articles;