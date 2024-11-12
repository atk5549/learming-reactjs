import React, {Component} from 'react';
import { add } from "./api";

import { Navigate } from "react-router-dom";

export default class TodoAdd extends Component {
    constructor(props) {

        // определяем методы для текущего компонента (TodoAdd)
        // данный формат записи это ссылки, которые нужны для чтобы привязать методы к контексту класса
        // так же данное определение методов по умолчанию не привязано к контексту
        // метод класса должен использовать ключивое слово this, чтобы метод мог получить доступ к свойствам класса
        // props предоставляет входые данные, которые поставляются в компонент из вне...
        //
        /* == про state ==
            1) state хранит такие обьекты или данные которые создаются в компоненте
             и полностью зависят от самого компанента
            2) чтобы определить обьект state для компонента созданного на основе класса,
             нам необходимо определить конструктор класса

             (snippet для WebStorm "rcfc")
             (snippet для VSCode "rconst")

             и затем передать параметрами props и затем определить метод super и передать в него тоже props чтобы
              вызвать родительский

        */

        super(props);

        this.state = {redirect: false};

        this.handleAccountNumberChange = this.handleAccountNumberChange.bind(this);
        this.handleDateAccountChange = this.handleDateAccountChange.bind(this);
        this.handleBuyerChange = this.handleBuyerChange.bind(this);
        this.handleSellerChange = this.handleSellerChange.bind(this);

        this.handleDescChange = this.handleDescChange.bind(this);
        this.handlImageChange = this.handlImageChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData();



    }


    clearFormData() {

        this.formData = {
            accountNumber: '',
            dateAccount: '',
            nameBuyer: '',
            nameSeller: '',
            desc: '',
            image: ''
        };



    }

    handleAccountNumberChange(evt) {
        this.formData.accountNumber = evt.target.value;
    }

    handleDateAccountChange(evt) {
        this.formData.dateAccount = evt.target.value;
    }

    // buyer
    handleBuyerChange(evt) {
        this.formData.nameBuyer = evt.target.value;
    }

    //seller
    handleSellerChange(evt) {
        this.formData.nameSeller = evt.target.value;
    }

    handleDescChange(evt) {
        this.formData.desc = evt.target.value;
    }

    handlImageChange(evt) {
        const cFiles = evt.target.files;
        if (cFiles.length > 0) {
            const fileReader = new FileReader();
            const that = this;
            fileReader.onload = () => {
                that.formData.image = fileReader.result;
            }
            fileReader.readAsDataURL(cFiles[0]);
        } else this.formData.image = '';
    }

    async handleFormSubmit(evt) {
        evt.preventDefault(); // отключаем обработку событий по умолчанию либо
        const newDeed = {...this.formData};
        const date = new Date();

        // генерируется после создания дела
        newDeed.done = false;
        newDeed.createdAt = date.toLocaleString();
        newDeed.finishedAt = "-- по окончанию --".toLocaleString();

        const addedDeed = await add(this.props.currentUser, newDeed);
        console.log("текущий пользователь из todoAdd: " + JSON.stringify(this.props.currentUser));
        this.props.add(addedDeed);
        // newDeed.key = date.getTime();
        // this.props.add(newDeed);
        // console.log(newDeed)
        // this.clearFormData();
        // evt.target.reset();
        this.setState((state) => ({ redirect: true }));

    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/" />;

        }
        else {
            return (
                <section>
                    <h1>Создание нового счёта</h1>
                    <form onSubmit={this.handleFormSubmit}>

                        <div className="field">
                            <label className="label">Номер (Счёта/ Счёт фактуры/ УПД)</label>
                            <div className="control">
                                <input className="input"
                                       onChange={this.handleAccountNumberChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Дата документа</label>
                            <div className="control">
                                <input className="input" onChange={this.handleDateAccountChange}/>
                            </div>
                        </div>
                        {/*buyer */}
                        <div className="field">
                            <label className="label">Наименование компании (Покупатель)</label>
                            <div className="control">
                                <input className="input" onChange={this.handleBuyerChange}/>
                            </div>
                        </div>
                        {/*seller */}
                        <div className="field">
                            <label className="label">Наименование компании (Продавец)</label>
                            <div className="control">
                                <input className="input" onChange={this.handleSellerChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Примечание</label>
                            <div className="control">
                                <input className="input"
                                          placeholder="Опишите с чем связан документ" onChange={this.handleDescChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="file">
                                <label className="file-label">
                                    <input className="file-input"
                                           type="file" accept="image/*"
                                           onChange={this.handlImageChange}/>
                                    <span className="file-cta">
                                        <span className="file-label">Скан документа</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="field is-grouped is-grouped-right">

                            <div className="control">
                                <input type="reset" className="button is-link is-light" value="Очистить форму"/>
                            </div>

                            <div className="control">
                                <input type="submit" className="button is-primary" value="Добавить документ"/>
                            </div>

                        </div>
                    </form>
                </section>
            );
        }
    }
}