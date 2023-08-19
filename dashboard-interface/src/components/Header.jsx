import { Link } from 'react-router-dom';

function Header() {

    return(
        <div className="header-body">
            <img src="../../public/blogLogo.png" className="logo"/>
            <div className='links'>
                <Link to="/" className="blog">
                    Blog
                </Link>
                <Link to="/create" className="create">
                    Create
                </Link>
            </div>
            <div className='profile'>
                Profile
            </div>
        </div>
    )
}

export default Header