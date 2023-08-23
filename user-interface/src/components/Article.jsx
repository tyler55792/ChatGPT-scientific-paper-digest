import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Article({ id, title, content, date }) {
    
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
            <Link to={ `/${id}` } className="chat-link">
                Ask GPT
            </Link>
        </div>
      </div>
    )
}

Article.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};
  
export default Article;