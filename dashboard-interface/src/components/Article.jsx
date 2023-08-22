import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Article({ id, title, content, date, sourceID, featured, updateClick, deleteClick }) {
    const featuredButtonText = featured ? "Unfeature" : "Feature";
    
    return (
      <div className="article-container">    
        <div className="article-date">
            { date }
        </div>
        <div className="article-title">
            { title }
        </div>
        <div className="article-content">
            { content }
        </div>
        <div className='buttons'>
            <button onClick={ () => updateClick(id, featured) } className="feature-button">
                { featuredButtonText }
            </button>
            <Link to={ `/${id}` } className="chat-link">
                Ask GPT
            </Link>
            <button onClick={ () => deleteClick(id, sourceID) } className="delete-button">
                Delete
            </button>
        </div>
      </div>
    )
}

Article.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    sourceID: PropTypes.string,
    featured: PropTypes.bool.isRequired,
    updateClick: PropTypes.func.isRequired,
    deleteClick: PropTypes.func.isRequired,
};
  
export default Article;