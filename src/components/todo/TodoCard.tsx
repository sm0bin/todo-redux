import { SquarePen, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import UpdateTodoModal from "./UpdateTodoModal";
// import { useAppDispatch } from "@/redux/hook";
// import { toggleTodo } from "@/redux/features/todoSlice";
// import { getPriority } from "os";

type TTodoCardProps = {
  _id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

const TodoCard = ({
  _id,
  title,
  priority,
  description,
  isCompleted,
}: TTodoCardProps) => {
  const [updateTodo, { data, isLoading, isError }] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  // const dispatch = useAppDispatch();

  //   const handleComplete = () => {
  //     console.log("Complete");
  //   };

  const toggleState = () => {
    const taskData = {
      title,
      description,
      isCompleted: !isCompleted,
      priority,
    };

    const options = {
      id: _id,
      data: taskData,
    };

    updateTodo(options);
    // dispatch(toggleTodo(id));
  };

  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input
        onChange={toggleState}
        type="checkbox"
        name="complete"
        id="complete"
        checked={isCompleted}
        className="cursor-pointer"
      />
      <p className="font-semibold">{title}</p>
      {/* <p>Time</p> */}

      <div>
        {isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>

      <p>{description}</p>

      <div className="space-x-5">
        <Button onClick={() => deleteTodo(_id)} className="bg-red-500">
          <Trash />
        </Button>
        <UpdateTodoModal
          todo={{
            _id,
            title,
            description,
            priority,
            isCompleted,
          }}
        />
        {/* <Button className="bg-[#5C53FE]">
          <SquarePen />
        </Button> */}
      </div>
    </div>
  );
};

export default TodoCard;
