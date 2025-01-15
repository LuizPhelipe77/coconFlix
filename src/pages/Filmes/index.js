import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import './filme_info.css'

function Filmes(){
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: '90d028b9efded32546cdb0cdbbb18195',
                    language: 'pt-BR'
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {

            })
        }

        loadFilmes();

        return () => {
            console.log('componente desmontado')
        }
    }, [])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando Detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse: </h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-btn">
                <button>Salvar</button>
                <button>
                    <a href="#"> Treiler</a>
                </button>
            </div>
        </div>
    )
}

export default Filmes;