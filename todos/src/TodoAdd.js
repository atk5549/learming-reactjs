import React, {Component} from 'react';

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
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handlImageChange = this.handlImageChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData();



    }


    clearFormData() {

        this.formData = {
            title: '',
            desc: '',
            image: ''
        };



    }

    handleTitleChange(evt) {
        this.formData.title = evt.target.value;
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

    handleFormSubmit(evt) {
        evt.preventDefault(); // отключаем обработку событий по умолчанию либо
        const newDeed = {...this.formData};
        const date = new Date();
        newDeed.done = false;
        newDeed.createdAt = date.toLocaleString();
        newDeed.key = date.getTime();
        this.props.add(newDeed);
        // console.log(newDeed)
        this.clearFormData();
        evt.target.reset();

    }

    render() {
        return (
            <section>
                <h1>Создание нового дела</h1>
                <form onSubmit={this.handleFormSubmit}>

                    <div className="field">
                        <label className="label">Заголовок</label>
                        <div className="control">
                            <input className="input"
                                   onChange={this.handleTitleChange} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Примечание</label>
                        <div className="control">
                            <input className="textarea"
                                   onChange={this.handleDescChange} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="file">
                            <label className="file-label">
                                <input className="file-input"
                                       type="file" accept="image/*"
                                       onChange={this.handlImageChange} />
                                <span className="file-cta">
                                    <span className="file-label">Графическая иллюстрация</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right">

                        <div className="control">
                            <input type="reset" className="button is-link is-light" value="Сброс" />
                        </div>

                        <div className="control">
                            <input type="submit" className="button is-primary" value="Создать дело" />
                        </div>

                    </div>
                </form>
            </section>
        );
    }
}