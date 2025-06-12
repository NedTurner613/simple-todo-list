import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { TodoList } from './components/TodoList';
import { TodoInput } from './components/TodoInput';

function App() {

  // const todos = 

  const [todos,setTodos] = useState([]);

  const [selectedTab,setSelectedTab] = useState('Open');


  function handleAddTodo(newTodo){
    const newTodoList = [...todos, {input: newTodo, complete: false}];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleCompleteTodo(index){
    todos.forEach((item, idx) => console.log(`todos item: ${item.input} at index ${idx}`));
    console.log(`handleCompleteTodo - item to delete: ${todos[index].input} index: ${index}`);
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo['complete'] = true;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleDeleteTodo(index){
    todos.forEach((item, idx) => console.log(`todos item: ${item.input} at index ${idx}`));
    let newTodoList = todos.filter((val,valIndex)=>{
      return valIndex !== index
    });
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleSaveData(currTodos){
    localStorage.setItem('todo-app', JSON.stringify(currTodos));
  }

  useEffect(()=>{
    if(!localStorage || !localStorage.getItem('todo-app')){
      const defaultTodos = [
        { input: 'Hello! Add your first todo!', complete: false },
        { input: 'This one is already done, you can delete it.', complete: true },
        { input: 'You can delete this one, too.', complete: true },
      ]
      setTodos(defaultTodos);
      handleSaveData(defaultTodos);
      console.log(`running useEffect to default checklist`);
      return;
    }
    setTodos(JSON.parse(localStorage.getItem('todo-app')));
  },[])

  return (
    <>
      <Header todos={todos}/>
      <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <TodoList todos={todos} selectedTab={selectedTab} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo}/>
      <TodoInput handleAddTodo={handleAddTodo}/>
    </>
  )
}

export default App
