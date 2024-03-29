
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import {createStore} from 'redux'
const TODO_ADD='TODO_ADD';
const TODO_TOGGLE='TODO_TOGGLE'

const initialState={
  todos:[],
}
const rootReducer = combineReducers({
  todoState:todoReducer,
  filterstate: filterReducer
})

function todoReducer(state=[], action) {
  switch(action.type) {
    case TODO_ADD : {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE : {
      return applyToggleTodo(state, action);
    }
    default : return state;
  }
}
function filterReducer(state='SHOW_ALL',action){
  switch(action.type){
    case FILTER_SET:{
      return applySetFilter(state,action);
    }
    default: return state;
  }
}
function doAddToDo(id,name){
  return {
    type: TODO_ADD,
    todo: {id,name},
  };
}
function doToggleTodo(id){
  return {
    type:TODO_TOGGLE,
    todo: {id},
  };
}
function applyAddTodo(state, action) {
  const todo = Object.assign({},action.todo,{completed:false});
  return state.concat(todo);
}

function applyToggleTodo(state, action) {
  return state.map(todo =>
  todo.id === action.todo.id
  ? Object.assign({}, todo, { completed: !todo.completed })
  : todo
);
}
function applySetFilter(state,action){
  return action.filter;
}

const store = createStore(rootReducer, initialState);

console.log('initial state:');
console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log('store update, current state:');
  console.log(store.getState());
});

store.dispatch(doAddToDo('0','learn redux'));

store.dispatch(doAddToDo('1','learn Mobx'));

store.dispatch(doToggleTodo('0'));

unsubscribe();
