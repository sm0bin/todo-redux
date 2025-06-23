import { SquarePen, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hook";
import { toggleTodo } from "@/redux/features/todoSlice";

type TTodoCardProps = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
};

const TodoCard = ({ title, description, id, isCompleted }: TTodoCardProps) => {
  const dispatch = useAppDispatch();

  //   const handleComplete = () => {
  //     console.log("Complete");
  //   };

  const toggleState = () => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input
        onChange={toggleState}
        type="checkbox"
        name="complete"
        id="complete"
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
        <Button className="bg-red-500">
          <Trash />
        </Button>
        <Button className="bg-[#5C53FE]">
          <SquarePen />
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
