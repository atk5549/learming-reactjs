import React, {Component} from 'react';

export default class TodoAdd extends Component {
    constructor(props) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handlImageChange = this.handlImageChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData = this.clearFormData.bind(this);
    }

    clearFormData() {
        this.formData = {
            title: '',
            desc: '',
            image: ''
        }
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
        evt.preventDefault();
        const newDeed = {...this.formData};
        const date = new Date();
        newDeed.done = false;
        newDeed.createdAt = date.toLocaleString();
        newDeed.key = date.getTime();
        this.props.add(newDeed);
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
                            <label className="file-label"></label>
                        </div>

                    </div>



                </form>
            </section>
        );
    }
}