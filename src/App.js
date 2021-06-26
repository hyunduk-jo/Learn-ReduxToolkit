import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, delTodo, getTodos } from "./reducers/todoSlice";

const App = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const { todos, loading } = useSelector(state => state.todos);
  console.log(todos, loading)

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch])

  const onValid = data => {
    dispatch(addTodo({ id: todos.length + 1, todo: data.todo }));
    setValue('todo', "");
  }

  const onClick = (id) => {
    dispatch(delTodo(id));
  }

  return (
    <div className="container-lg">
      <form onSubmit={handleSubmit(onValid)}>
        <input type="text" {...register("todo")} />
        <button>Add Todo</button>
      </form>
      <h1>Todos</h1>
      {
        todos.map(todo => <div key={todo.id}>
          <span className="fs-3"> - {todo.todo}</span>
          <button onClick={() => onClick(todo.id)}>X</button>
        </div>
        )
      }
    </div>
  );
}

export default App;
