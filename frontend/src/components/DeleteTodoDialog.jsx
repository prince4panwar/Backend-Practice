import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function DeleteTodoDialog() {
  const { userId } = useParams();
  const navigate = useNavigate();

  async function deleteTodo(_id) {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${userId}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Task not deleted successfully");
      console.log(error);
    }
  }

  function onDelete() {
    deleteTodo();
    navigate("/todos");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="group flex items-center gap-2 cursor-pointer font-semibold text-white py-2 px-4 rounded transition-all
             bg-red-500 hover:bg-red-700 mt-2"
        >
          <Trash
            size={19}
            className="transition-all duration-300 group-hover:-translate-x-1"
          />
          Delete Task
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this task?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove your task from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-red-500 hover:bg-red-800"
            onClick={onDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTodoDialog;
