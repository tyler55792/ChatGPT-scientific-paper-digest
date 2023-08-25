import { Link } from 'react-router-dom';

function Header() {

    return(
        <div className="header-body">
            <Link to="/featured" className="logo-link">
                <img src="/logo5.png" className="logo"/>
            </Link>
            <div className='links'>
                <Link to="/featured" className="featured">
                    Featured
                </Link>
                <Link to="/" className="blog">
                    Browse
                </Link>
            </div>
            <a href='https://github.com/tyler55792/ChatGPT-scientific-paper-digest' className='git-logo-link'>
                <img src="/gitLogo.png" className="git-logo"/>
            </a>
        </div>
    )
}

export default Header