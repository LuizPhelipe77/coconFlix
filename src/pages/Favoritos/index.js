import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@saraFlix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme(id){
        let filtroFilme = filmes.filter( (item) => {
            return (item.id !== id)   // retorna todos os item menos o que foi clicado 'excluido'
        })

        setFilmes(filtroFilme);
        localStorage.setItem('@saraFlix', JSON.stringify(filtroFilme) )
    }

    return(
        <div className='meus-filmes'>
            <h1>Minha Lista</h1>

            {filmes.length === 0 && <span> você não possui nenhum filme salvo</span> }

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <div className='container'>
                                <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt={item.title} />
                                <span>{item.title}</span>
                            </div>
                            <div>
                                <h3>{item.tagline}</h3>
                            </div>
                            <div>
                                <Link to={`/filmes/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                        
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;