import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import './filme_info.css'
import { jsx } from "react/jsx-runtime";

function Filmes(){
    const {id} = useParams();
    const navigate = useNavigate();

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
                navigate('/', { replace:true });
                return;
            })
        }

        loadFilmes();

        return () => {
            
        }
    }, [id, navigate])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@saraFlix');

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            alert('ESSE FILME JÁ ESTA NA LISTA')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@saraFlix', JSON.stringify(filmesSalvos));
        alert('Filme Salvo')
    }

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
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}> Treiler</a>
                </button>
            </div>
        </div>
    )
}

export default Filmes;