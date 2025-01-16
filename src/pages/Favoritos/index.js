import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@saraFlix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    return(
        <div className='meus-filmes'>
            <h1>Minha Lista</h1>

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filmes/${item.id}`}>Ver detalhes</Link>
                                <button>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;