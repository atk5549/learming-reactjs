import { useParams } from "react-router-dom";

export default function TodoDetail(props) {

    const {key} = useParams();
    const deed = props.getDeed(key);

    return (
        <section>
            {deed.done &&
                <p className="has-text-success">Документ зарегистрирован</p>
            }

            <h1>{deed.accountNumber}</h1>

            <p>{deed.finishedAt}</p>

            {deed.desc && <p>{deed.desc}</p>}

            {deed.image && <p><img src={deed.image}
                                   alt="Иллюстрация" /></p>}
        </section>
    );
};