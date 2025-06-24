// components/modals/UpdateTodoModal.tsx
import { useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateTodoMutation } from "@/redux/api/api";
import { SquarePen } from "lucide-react";

type TUpdateTodoModalProps = {
  todo: {
    _id: string;
    title: string;
    description: string;
    priority: string;
    isCompleted?: boolean;
  };
};

const UpdateTodoModal = ({ todo }: TUpdateTodoModalProps) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);

  const [updateTodo] = useUpdateTodoMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedTask = {
      title,
      description,
      priority,
      isCompleted: todo.isCompleted || false,
    };

    const options = {
      id: todo._id,
      data: updatedTask,
    };

    updateTodo(options);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5C53FE]">
          <SquarePen />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Modify and update your task details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value)}
              >
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit">Update</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoModal;
