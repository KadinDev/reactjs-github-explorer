
// Criada a interface com typescript
interface RepositoryItemProps {
    repository: {
        name: string;
        full_name: string;
        html_url: string;
    }
}


// agora digo que essa função seguirá a interface acima (props: RepositoryItemProps)
export function RepositoryItem(props: RepositoryItemProps) {
    return (
        <li>
            <strong> {props.repository.name} </strong>
            <p>{props.repository.full_name}</p>

            <a href={props.repository.html_url} target='_blank'>
                {props.repository.html_url}
            </a>
        </li>
    )
}