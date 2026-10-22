import {useLogin} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const Login = () => {


    const { mutate: login } = useLogin();


    const {
        refineCore: { onFinish, formLoading, query },
        register,
        handleSubmit,
        formState: { errors },
        saveButtonProps,
    } = useForm({
        refineCoreProps: {
            resource: "products",
            action: "edit",
            id: 123,
        },
    });

    const handleSubmitForm = handleSubmit((values)=>{
        console.log({values})
        login(values)
    })


  return (
      <form onSubmit={handleSubmitForm}>
          <label>
              Name:
              <input {...register("username")} />
          </label>
          <label>
              password:
              <input {...register("password")} />
          </label>
          <button type="submit">Submit</button>
      </form>
  );
};
