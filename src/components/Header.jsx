export function Header(props){
    const { todos } = props;
    const todosLength = todos != 'undefined' ? todos.length : 0;
    // const isTasksPlural = todos.length !== 1;
    // const todosLength = todos.length;
    const isTasksPlural = todos.length !== 1;
    

    const taskOrTasks = isTasksPlural ? 'tasks' : 'task';
    return (
        <header>
            <h1 className="text-gradient">You have {todosLength} open {taskOrTasks}.</h1>
        </header>
    )
}