import './header.css'
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header>
            <Link className='logo' to='/'>SaraFlix</Link>
            <Link className='favoritos' to='/favoritos'>Meus Favoritos</Link>
        </header>
    )
}

export default Header;