import {Component} from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
import TodoDetail from "./TodoDetail";

// auth and register
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Register from "./Register";
import Logout from "./Logout";
import Login from "./Login";
import firebaseApp from "./firebase";
import { getList } from "./api";


// imports for ag-grid
import {CrewlistTableData} from "./initDataForMarinePDS/CrewList";
import {ShipStoreTableData} from "./initDataForMarinePDS/ShipStore";

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

// const date1 = new Date(2021, 7, 19, 14, 5)
// const date2 = new Date(2021, 7, 19, 15, 23)
// const initialData = [
//   {
//     title: "Изучать React",
//     desc: "Да поскорее",
//     image: "",
//     done: true,
//     createdAt: date1.toLocaleString(),
//     key: date1.getTime()
//   },
//   {
//     title: "Написать первое React-приложение",
//     desc: "Список запланированных дел",
//     image: "",
//     done: false,
//     createdAt: date2.toLocaleString(),
//     key: date2.getTime()
//   }
// ];

export default class App extends Component {
  constructor(props) {
    super(props);

    // this.data = initialData; // в место этой строки мы создали строку ниже для того чтобы
    // работать с данными через состояние а не на прямую с обьектом initialData, т.е мы поместили обьект initialData
    // в state чтобы отслеживать его состояние
    this.state = {
      data: [],
      showMenu: false,
      currentUser: undefined
    };

    this.setDone = this.setDone.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.getDeed = this.getDeed.bind(this);
    this.authStateChanged = this.authStateChanged.bind(this);




  }

  add(deed) {
    this.state.data.push(deed);
    this.setState((state)=>({}));
  }



  setDone(key) {
    const deed = this.state.data.find((current) => current.key === key);
    if (deed) {
      deed.done = true;
    this.setState((state) => ({}));

    }
  }

  delete(key) {
    const newData = this.state.data.filter(
        (current) => current.key !== key
    );
    this.setState((state) => ({ data: newData}));
  }


  showMenu(evt) {
    evt.preventDefault();
    this.setState((state) => ({showMenu: !state.showMenu}));
  }


  getDeed(key) {
    key = +key; // унарный плюс преобразует строку в число
    return this.state.data.find((current) => current.key === key);
  }


  authStateChanged(user) {
    this.setState((state) => ({ currentUser: user }));
    const todolist = getList(user)
    console.log(todolist)
  }

  componentDidMount() {
    onAuthStateChanged(getAuth(firebaseApp), this.authStateChanged);
  }


  render() {
    return (
        <HashRouter>
          <nav className="navbar is-light">
            <div className="navbar-brand">

              <NavLink to="/" className={({isActive}) => 'navbar-item is-uppercase' +
                  (isActive ? 'is-active is-uppercase' : '')}
              >
                {this.state.currentUser ? this.state.currentUser.email : 'TODOS'}
              </NavLink>


              <a
                  href="/"
                  className={this.state.showMenu ?
                      "navbar-burger is-active" :
                      "navbar-burger"}
                  onClick={this.showMenu}>
                <span></span>
                <span></span>
                <span></span>
              </a>

            </div>

            <div className={this.state.showMenu ? 'navbar-menu is-active' : 'navbar-menu'}
                 onClick={this.showMenu}>

              <div className="navbar-start">

                {/* if user auth-ed show make deed and logout */}
                {this.state.currentUser && (
                    <>

                      {/* if user auth-ed show make deed */}
                      <NavLink to="/add"
                               className={({isActive}) =>
                                   'navbar-item' + (isActive ? 'is-active' : '')}>Создать дело</NavLink>

                      {/* if user auth-ed show logout */}
                      <NavLink to="/logout"
                               className={({isActive}) =>
                                   'navbar-item' + (isActive ? 'is-active' : '')}>Выйти</NavLink>

                    </>
                )}

                {/* if user not auth-ed show Login */}
                {!this.state.currentUser && (
                    <>
                      {/* if user not auth-ed show Login */}
                      <NavLink to="/login"
                               className={({isActive}) =>
                              'navbar-item' + (isActive ? 'is-active' : '')}>Войти</NavLink>
                      {/* if user not auth-ed show Register */}
                      <NavLink to="/register" className={({isActive}) =>
                          'navbar-item' + (isActive ? 'is-active' : '')}>Зарегистрироваться</NavLink>
                    </>
                )}
              </div>
            </div>
          </nav>

          <main className="content px-6 mt-6">
            <Routes>
              <Route path="/" element={<TodoList list={this.state.data} setDone={this.setDone} delete={this.delete}/>}/>
              <Route path="/add" element={<TodoAdd add={this.add} currentUser={this.state.currentUser}/>}/>
              <Route path="/:key" element={<TodoDetail getDeed={this.getDeed}/>}/>
              <Route path="/register" element={<Register currentUser={this.state.currentUser}/>} />
              <Route path="/login" element={<Login currentUser={this.state.currentUser}/>} />
              <Route path="/logout" element={<Logout currentUser={this.state.currentUser}/>} />
            </Routes>
          </main>

          <hr/>
          <section className="ag-theme-quartz" style={{padding: 80, height: 500, width: 1000}}>
            <h1>Судовая роль</h1>
            <AgGridReact rowData={CrewlistTableData.rowData} columnDefs={CrewlistTableData.colDefs}/>
            <hr/>
            <h1>Судовые припасы</h1>
            <AgGridReact rowData={ShipStoreTableData.rowData} columnDefs={ShipStoreTableData.colDefs}/>
          </section>
        </HashRouter>
    );
  }
}


