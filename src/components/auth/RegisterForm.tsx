import { useForm } from "react-hook-form";
import {
  EmailInput,
  PasswordInput,
  RadioOption,
  SelectOption,
  TextAreaInput,
  TextInput,
  FileUpload
} from "../../components/form/input";
import { yupResolver } from "@hookform/resolvers/yup";
import authSvc from "../../services/auth.service";
import { RegisterDefaultValues, RegisterDTO, type IRegisterData } from "../../pages/auth/auth.contract";
import { toast } from "sonner";
import type { AxiosSuccessResponse } from "../../config/axios.config";
import { useNavigate } from "react-router";

const RegisterFormComponent = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, reset, formState: { errors, isSubmitting }, setValue, setError } = useForm<IRegisterData>({
    defaultValues: RegisterDefaultValues as IRegisterData,
    resolver: yupResolver(RegisterDTO) as any
  });

  const submitForm = async (data: IRegisterData) => {
    try {
      await authSvc.registerUser(data) as unknown as AxiosSuccessResponse ;
      toast.success("Register Success", {
        description: "Please check your email for further activation process..."
      })
      navigate('/')
    } catch (exception: any) {
      if (exception.code === 400) {
        Object.keys(exception.error.error).map((field) => {
          setError(field as keyof IRegisterData, { message: exception.error.error[field] })
        })
    }
    toast.error("Cannot Register!!!", {
      description: "Please try again later."
    })
  }
  };
  return (<>
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-2">

      {/* Full Name */}
      <div className="flex w-full">
        <label htmlFor="name" className="w-2/5 text-lg font-semibold">Full name:</label>
        <div className="flex w-4/5 flex-col">
          <TextInput
            name="name"
            control={control}
            errMsg={errors?.name?.message}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex w-full">
        <label className="w-2/5 text-lg font-semibold">Email :</label>
        <div className="w-4/5">
          <EmailInput name="email" control={control} errMsg={errors?.email?.message} />
        </div>
      </div>

      {/* Password */}
      <div className="flex w-full">
        <label className="w-2/5 text-lg font-semibold">Password :</label>
        <div className="w-4/5">
          <PasswordInput name="password" control={control} errMsg={errors?.password?.message} />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="flex w-full">
        <label className="w-2/5 text-lg font-semibold">Re-Password :</label>
        <div className="w-4/5">
          <PasswordInput
            name="confirmPassword"
            control={control}
            errMsg={errors?.confirmPassword?.message}
          />
        </div>
      </div>

      {/* Role */}
      <div className="flex w-full">
        <label className="w-2/5 text-lg font-semibold">Role :</label>
        <div className="w-4/5">
          <SelectOption
            name="role"
            control={control}
            errMsg={errors?.role?.message}
            options={[
              { label: "Buyer", value: "customer" },
              { label: "Seller", value: "seller" },
            ]}
          />
        </div>
      </div>

      {/* Gender */}
      <div className="flex w-full">
        <label className="w-2/5 text-lg font-semibold">Gender :</label>
        <div className="w-4/5">
          <RadioOption
            name="gender"
            control={control}
            errMsg={errors?.gender?.message}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />
        </div>
      </div>

      {/* Phone */}
      <div className="flex w-full">
        <label className="w-2/5 text-lg font-semibold">Phone :</label>
        <div className="w-4/5">
          <TextInput name="phone" control={control} errMsg={errors?.phone?.message} />
        </div>
      </div>

      {/* Address */}
      <div className="flex w-full">
        <label className="w-2/5 text-lg font-semibold">Address :</label>
        <div className="w-4/5">
          <TextAreaInput name="address" control={control} errMsg={errors?.address?.message} />
        </div>
      </div>

      {/* Image */}
      <div className="flex w-full">
        <label className="w-2/5 text-lg font-semibold">Image :</label>
        <div className="w-4/5">
          <FileUpload
            name="image"
            setValue={(name: string, value: File) => setValue(name as any, value)}
            control={control}
            errMsg={errors?.image?.message as string} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full">
        <div className="w-2/5"></div>
        <div className="w-3/5 flex gap-5">
          <button
            type="reset"
            onClick={() => reset()}
            disabled={isSubmitting}
            className="disabled:bg-red-800/30 disabled:cursor-not-allowed w-full font-semibold bg-red-800 py-2 text-white rounded-lg hover:bg-red-900 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="disabled:bg-blue-800/30 disabled:cursor-not-allowed w-full font-semibold bg-blue-800 py-2 text-white rounded-lg hover:bg-blue-950 transition"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  </>)
}
export default RegisterFormComponent; 