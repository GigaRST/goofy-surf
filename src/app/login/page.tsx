"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/lib/features/user/userSlice";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Insert a valid email"),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    console.log({ data });

    dispatch(login());
    toast.success("Login Success!");
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <div className="card w-full max-w-sm shadow-lg bg-gray-100">
        <div className="card-body">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              label="Email"
              placeholder="Insert your email"
              type="email"
              register={register("email")}
              error={errors.email}
            />
            <FormField
              label="Password"
              placeholder="Insert your password"
              type="password"
              register={register("password")}
              error={errors.password}
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
      <p className="text-white mt-3">
        Don&apos;t have an account?{" "}
        <Link
          href={"/register"}
          className="text-blue-500 underline ml-2 font-semibold hover:text-blue-400"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
