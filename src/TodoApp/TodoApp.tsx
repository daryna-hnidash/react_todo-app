import React, {
  useContext, useState,
} from 'react';
import { TodoList } from '../TodoList';
import { TodosContext } from '../TodosContext';
import { TodosFilter } from '../TodosFilter';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [allCheckd, setAllCheckd] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const notCompletedTodos = [...todos].filter(todo => todo.completed === false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      const newTodo = {
        id: +new Date(),
        title: trimmedValue,
        completed: false,
      };

      setTodos(prevTodos => (
        [...prevTodos,
          newTodo,
        ]
      ));

      setInputValue('');
    }
  };

  const checkingAllHandler = () => {
    setTodos(todos.map(t => (
      {
        ...t,
        completed: !allCheckd,
      })));

    setAllCheckd(!allCheckd);
  };

  const deleteCompletedHandler = () => {
    setTodos(curTodos => {
      const notCompleted = [...curTodos]
        .filter(currTodo => currTodo.completed === false);

      return notCompleted;
    });
  };

  const completedTodosCounter = todos
    .filter(currTodo => currTodo.completed === true).length;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={onSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={onInputChangeHandler}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={allCheckd}
          onChange={checkingAllHandler}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${notCompletedTodos.length} items left`}
        </span>

        <TodosFilter />

        {completedTodosCounter > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={deleteCompletedHandler}
          >
            Clear completed
          </button>
        )}
      </footer>
    </div>
  );
};
