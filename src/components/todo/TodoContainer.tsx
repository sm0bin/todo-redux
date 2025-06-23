// import { useState } from "react";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import AddTodoModal from "./AddTodoModal";
// import { useAppSelector } from "@/redux/hook";
import { useGetTodosQuery } from "@/redux/api/api";
import { useState } from "react";

const TodoContainer = () => {
  //   const [todos, setTodos] = useState({ data: [] });
  //   const { todos } = useAppSelector((state) => state.todos);
  const [priority, setPriority] = useState("");
  const { data: todos, error, isLoading } = useGetTodosQuery(priority);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  console.log("Todos:", todos);

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl font-semibold text-red-500">
          Error loading todos
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-5 ">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl  p-[5px]">
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
          {todos?.data?.map((item) => (
            <TodoCard {...item} />
          ))}
        </div>
        {/* <div className="bg-white text-2xl font-bold p-5 flex justify-center items-center rounded-md">
          <p>There is no task pending</p>{' '}
        </div> */}
      </div>
    </div>
  );
};

export default TodoContainer;
