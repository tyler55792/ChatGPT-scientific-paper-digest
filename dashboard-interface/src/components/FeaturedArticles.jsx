import { useEffect, useState } from "react"
import Article from "./Article.jsx"

function FeaturedArticles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // GET request
        fetch('https://gpt-backend-kcv6.onrender.com/api/posts')
            .then(response => response.json())
            .then(data => {
                setArticles(data.posts);
            })
            .catch(error => {
                console.error('Error: ', error);
            })
    }, [articles]);

    const deleteClick = async (id, sourceID) => {
        try {
            const response = await fetch(
                `https://gpt-backend-kcv6.onrender.com/api/posts/${id}?sourceID=${sourceID}`,
                { method:"DELETE" });
            if (response.ok) {
                const updatedArticles = articles.filter(article => article.id !== id);
                setArticles(updatedArticles);
                console.log('Delete was successful');
            } else {
                console.error('Delete request failed');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const updateClick = async (id, featured) => {
        try {
            const response = await fetch(
                `https://gpt-backend-kcv6.onrender.com/api/posts/${id}?featured=${featured}`,
                { method: "PUT"});
            if (response.ok) {
                console.log('Update succcessful');
            } else {
                console.error('Update request failed');
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <div className="articles-body">
            <div className='latest-stories'>
                Featured
            </div>
            {articles
                .filter((post) => post.featured === true)
                .map((post) => {
                    return <Article 
                        key={ post._id } 
                        title={ post.title } 
                        content={ post.content } 
                        date={ post.date } 
                        id={ post._id } 
                        sourceID={ post.sourceID }
                        featured={ post.featured }
                        deleteClick={ deleteClick }
                        updateClick={ updateClick }/>
                })
            }
        </div>
    )
}
  
export default FeaturedArticles;