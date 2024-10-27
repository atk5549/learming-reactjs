import { Component } from "react";

const date1 = new Date(2021, 7, 19, 14, 5)
const date2 = new Date(2021, 7, 19, 15, 23)

const initialData = [

  {
    title: "Изучать React",
    desc: "Да поскорее",
    image: "",
    done: true,
    createdAt: date1.toLocaleString(),
    key: date1.getTime()
  },

  {
    title: "Написать первое React-приложение",
    desc: "Список запланированных дел",
    image: "",
    done: false,
    createdAt: date2.toLocaleString(),
    key: date2.getTime()
  }

];


