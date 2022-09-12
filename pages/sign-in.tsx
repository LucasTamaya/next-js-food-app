import type { NextPage } from "next";
import GoogleIcon from "@mui/icons-material/Google";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";

import {
  googleProvider,
  signInWithProvider,
  signInWithEmailAndPasswordForm,
} from "../firebase-config";
import { ILoginFormValues } from "src/interfaces";
import { loginValidationSchema } from "src/yupSchema";

const SignIn: NextPage = () => {
  // tous les outils nécessaires afin de gérer mon formulaire
  const { control, handleSubmit } = useForm<ILoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
  });

  const [state, setState] = useState("");

  const [cookie, setCookie] = useCookies(["userId"]);

  const router = useRouter();

  const handleSignInWithEmailAndPassword = async (input: ILoginFormValues) => {
    try {
      const { email, password } = input;

      const userId = await signInWithEmailAndPasswordForm(email, password);

      setCookie("userId", userId, {
        path: "/",
        maxAge: 24 * 60 * 60,
        sameSite: true, // change to false if bug on production
      });

      setState("CONNECTED");

      router.push("/");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const handleSignInWithProvider = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      const userId = await signInWithProvider(googleProvider);

      setCookie("userId", userId, {
        path: "/",
        maxAge: 24 * 60 * 60,
        sameSite: true, // change to false if bug on production
      });

      router.push("/");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <form
        className="border-2 border-black p-5"
        onSubmit={handleSubmit(handleSignInWithEmailAndPassword)}
      >
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <input
                value={value || ""}
                type="email"
                className="border-2 border-black px-4 py-2 rounded"
                placeholder="Email"
                onChange={onChange}
              />
              {!!error && (
                <p className="text-red-500 text-xs">{error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <input
                value={value || ""}
                type="password"
                className="border-2 border-black px-4 py-2 rounded"
                placeholder="Password"
                onChange={onChange}
              />
              {!!error && (
                <p className="text-red-500 text-xs">{error.message}</p>
              )}
            </div>
          )}
        />

        <button>Sign-In</button>

        <button
          onClick={handleSignInWithProvider}
          className="bg-blue-500 w-full text-white p-3 rounded-lg flex flex-row items-center gap-x-2"
        >
          <GoogleIcon sx={{ fontWeight: 25, color: "#fff" }} />
          Sign-in with Google
        </button>
      </form>
      {state}
    </div>
  );
};

export default SignIn;