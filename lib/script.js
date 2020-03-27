"use strict";

var list = document.querySelector(".list"),
    form = document.querySelector("form"),
    time = document.querySelector(".time"),
    redo = document.querySelector(".fa-sync"),
    add = document.querySelector(".fa-plus-circle"),
    addToDo = document.querySelector(".addToDo"),
    filter = document.querySelector(".filter"),
    li = document.getElementsByTagName("li"),
    moment = require("moment");

if (!window.localStorage.items) {
  window.localStorage.items = "";
} else {
  list.innerHTML = window.localStorage.items;
}

setInterval(function () {
  var date = new Date();
  time.innerHTML = moment(date).format("LL");
}, 1000);

var store = function store() {
  window.localStorage.items = list.innerHTML;
};

var addTo = function addTo(e) {
  e.preventDefault();
  window.localStorage.items += "<li class=\"".concat(addToDo.value, "\"><i  class=\"fa fa-circle-thin\" ></i>").concat(addToDo.value, "   <i class=\"fa fa-trash\"></i></li>");
  list.innerHTML = window.localStorage.items;
  addToDo.value = "";
  list.classList.add("active");
  list.lastChild.classList.add("move");
  setTimeout(function () {
    list.classList.remove("active");
  }, 500);
  setTimeout(function () {
    list.lastChild.classList.remove("move");
  }, 750);
};

var clear = function clear() {
  window.localStorage.clear();
  list.innerHTML = "";
  store();
};

var removeToDo = function removeToDo(e) {
  var target = e.target;

  if (target.classList.contains("fa-trash")) {
    target.parentElement.classList.add("delete");
    setTimeout(function () {
      target.parentElement.parentElement.removeChild(target.parentElement);
      target.parentElement.classList.remove("delete");
      store();
    }, 600);
  }
};

var checkToDo = function checkToDo(e) {
  var target = e.target;

  if (target.classList.contains("fa-circle-thin")) {
    target.classList.remove("fa-circle-thin");
    target.classList.add("fa-check-circle");
    target.parentElement.style.textDecoration = "line-through";
    target.style.color = "green";
    store();
  } else if (target.classList.contains("fa-check-circle")) {
    target.classList.remove("fa-check-circle");
    target.classList.add("fa-circle-thin");
    target.style.color = "white";
    target.parentElement.style.textDecoration = "none";
    store();
  }
};

var filterList = function filterList() {
  var regex = new RegExp("^".concat(filter.value), "i");
  console.log(regex);

  for (var i = 0; i < li.length; i++) {
    console.log(regex.test(li[i].classList[0]));

    if (!regex.test(li[i].classList[0])) {
      li[i].style.display = "none";
    } else {
      li[i].style.display = "block";
    }
  }
};

add.addEventListener("click", addTo);
redo.addEventListener("click", clear);
list.addEventListener("click", removeToDo);
list.addEventListener("click", checkToDo);
filter.addEventListener("keyup", filterList);