"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormField from "../../components/FormField";
import Link from "next/link";
import Button from "../../components/Button";

const registerSchema = z
  .object({
    email: z.string().email("Inserisci un'email valida"),
    password: z
      .string()
      .min(6, "The password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((val) => val.password !== val.confirmPassword, {
    message: "Password should be the same",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <div className="card w-full max-w-sm shadow-lg bg-gray-100">
        <div className="card-body">
          <h1 className="text-2xl font-semibold text-center">Register</h1>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
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
            <FormField
              label="Confirm Password"
              placeholder="Confirm password"
              type="password"
              register={register("confirmPassword")}
              error={errors.confirmPassword}
            />
            <Button type="submit">Register</Button>
          </form>
        </div>
      </div>
      <p className="text-white mt-3">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="text-blue-500 underline ml-2 font-semibold hover:text-blue-400"
        >
          login
        </Link>
      </p>
    </div>
  );
}
