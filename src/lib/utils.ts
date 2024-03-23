import { toast } from "sonner";

export const handleError = (error: unknown) => {
  let message;
  if (error instanceof Error) {
    message = error.message;
    toast.error(message);
    console.error(message);
  } else {
    message = "Something went wrong";
    toast.error(message);
    console.error(message);
  }
};
