import {useState, useEffect} from 'react'
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';

// https://api.github.com/orgs/rocketseat/repos <- da Rocketseat

// Crio a interface aqui do mesmo modo que no RepositoryItem.tsx
interface Repository {
    name: string;
    full_name: string;
    html_url: string;
}

export function RepositoryList() {

    // e uso da seguindo forma depois do useState:  <Repository[]> informando aque será um array
    // pq terá mais de uma informação para exibir abaixo
    const [repositories, setRepositories] = useState<Repository[]>([])

    useEffect(() => {
        //Buscar no 'https://..'  
        fetch('https://api.github.com/users/KadinDev/repos')
    
        //.then = quando devolver uma resposta/ response = converte a resposta em .json       
        .then(response => response.json())

        // quando convertido a resposta eu vou ter os dados que quero
        // e mando a resposta para o setRepositories como (data), pq coloquei o data na frente
        .then(data => setRepositories(data) )

    }, [])

    return (
        <section className="repository-list">
            <h1>Lista de Repositórios</h1>

            <ul>
                {repositories.map(repository => {
                    return <RepositoryItem key={repository.name} repository={repository}/>
                } )}
                
            </ul>
        </section>
    )
}