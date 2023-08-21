import { useEffect, useState } from "react"
import Article from "./Article.jsx"
import PropTypes from 'prop-types';

function Articles({showFeaturedOnly=false}) {
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

    const deleteClick = async (id, sourceID) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/posts/${id}?sourceID=${sourceID}`,
                { method:"DELETE" });
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

    const updateClick = async (id, featured) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/posts/${id}?featured=${featured}`,
                { method: "PUT"});
            if (response.ok) {
                //update page
                console.log('Update succcessful');
            } else {
                console.error('Update request failed');
            }
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    const title = showFeaturedOnly ? "Featured Articles" : "Latest Articles"

    if (showFeaturedOnly) {
        return (
            <div className="articles-body">
                <div className='latest-stories'>
                    {title}
                </div>
                    {articles
                        .filter((post) => post.featured === true)
                        .map((post) => {
                            return <Article 
                                key={post._id} 
                                title={post.title} 
                                content={post.content} 
                                date={post.date} 
                                id={post._id} 
                                sourceID={post.sourceID}
                                featured={post.featured}
                                deleteClick={deleteClick}
                                updateClick={updateClick}/>
                        })
                    }
            </div>
        )
    } else {
        return (
            <div className="articles-body">
                <div className='latest-stories'>
                    {title}
                </div>
                {articles.map((post) => {
                    return <Article 
                        key={post._id} 
                        title={post.title} 
                        content={post.content} 
                        date={post.date} 
                        id={post._id} 
                        sourceID={post.sourceID}
                        featured={post.featured}
                        deleteClick={deleteClick}
                        updateClick={updateClick}/>
                })}
            </div>
        )
    }
}

Articles.propTypes = {
    showFeaturedOnly: PropTypes.bool
};
  
export default Articles;