import React from 'react';
import {Link} from "react-router-dom";


export default function TodoList(props) {
    return (
        <section>

            { !props.currentUser ? <h1>Необходимо создать или войти в профиль</h1> : <h1>Список счетов</h1>}
            <hr/>
            <table className="table is-hoverable is-fullwidth">
                <tbody>
                {props.list.map((item) => (
                    <tr key={item.key}>
                        <hr/>

                        <td>
                            <h5>Номер документа</h5>

                            <Link to={`/${item.key}`}>
                                {item.done && <strong>{item.accountNumber}</strong>}
                                {!item.done && item.accountNumber}
                            </Link>

                        </td>

                        <td>
                            <h5>Дата документа</h5>
                            {item.done && <strong>{item.dateAccount}</strong>}
                            {!item.done && item.dateAccount}
                        </td>

                        <td>
                            <h5>Продавец</h5>
                            {item.done && <strong>{item.nameBuyer}</strong>}
                            {!item.done && item.nameBuyer}
                        </td>

                        <td>
                            <h5>Покупатель</h5>
                            {item.done && <strong>{item.nameSeller}</strong>}
                            {!item.done && item.nameSeller}
                        </td>

                        <td className="">
                            <h5>Описание документа</h5>
                            <p>{item.desc}</p>
                        </td>


                        <td>
                            <h5>Дата регистрации документа</h5>
                            <strong>{item.done && item.finishedAt}</strong>
                            {!item.done && item.finishedAt}
                        </td>


                        <td>

                            <h3 className={item.done ? "has-text-primary" : "has-text-warning"}>
                                {!item.done ? "Документ в стадии регистрации" : "Документ зарегистрирован"}
                            </h3>

                        </td>


                        <td>
                            <button
                                className="button is-success"
                                title="Пометить как сделанное"
                                disabled={item.done}
                                onClick={(e) => props.setDone(item.key)}
                            >&#9745;</button>
                        </td>

                        <td>
                            <button
                                className="button is-danger"
                                title="Удалить"
                                disabled={item.done}
                                onClick={(e) => props.delete(item.key)}
                            >&#9746;</button>
                        </td>
                        <hr/>

                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}