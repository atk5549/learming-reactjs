import React from 'react';
import {Link} from "react-router-dom";


export default function TodoList(props) {
    return (
        <section>

            { !props.currentUser ? <h1>Необходимо создать или войти в профиль</h1> : <h1>Список дел</h1>}
            <hr/>
            <table className="table is-hoverable is-fullwidth">
                <tbody>
                {props.list.map((item) => (
                    <tr key={item.key}>
                        <hr/>

                        <td>
                            <h5>Заголовок</h5>

                            <Link to={`/${item.key}`}>
                                {item.done && <del>{item.title}</del>}
                                {!item.done && item.title}
                            </Link>

                        </td>
                        <td>

                            <h3>{item.done ? "Выполнено" : "Не выполнено"}</h3>

                        </td>

                        <section className="">
                            <h5>Описание</h5>

                            <textarea className="textarea"
                                      placeholder={item.desc}
                                      disabled={item.done ? true : false}
                            />
                        </section>


                        {/*{item.done && <del>{item.desc}</del>}*/}
                        {/*{!item.done && item.desc}*/}


                        <td>
                            <h5>Дата создания</h5>
                            {item.done && item.createdAt}
                            {!item.done && item.createdAt}
                        </td>

                        <td>
                            <h5>Дата окончания</h5>
                            {item.done && item.finishedAt}
                            {!item.done && item.finishedAt}
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