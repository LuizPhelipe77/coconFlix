import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import './home.css'

///movie/now_playing?api_key=90d028b9efded32546cdb0cdbbb18195&language=pt-BR

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: '90d028b9efded32546cdb0cdbbb18195',
                    language: 'pt-BR',
                    page: 1
                }
            })

            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
        }
        loadFilmes();
    }, [])
    if(loading){
        return(
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filmes/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;