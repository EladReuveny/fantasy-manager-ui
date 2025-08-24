import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpUser } from "../api/userApi";
import Auth2Provider from "../components/Auth2Provider";
import Logo from "../components/Logo";
import ShowPassword from "../components/ShowPassword";
import useAuth from "../hooks/useAuth";
import type { UserSignUpDto } from "../types/user";

type SignUpProps = {};

const SignUp = ({}: SignUpProps) => {
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const user: UserSignUpDto = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      userTeamName: formData.get("userTeamName") as string,
    };

    try {
      const data = await signUpUser(user);
      signIn(data);
      navigate("/team");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data);
        toast.error(err.response?.data);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center pb-10">
      <Link to={"/"} className="absolute top-0">
        <Logo width={150} height={150} />
      </Link>
      <h1 className="font-bold text-4xl mb-2">
        Welcome,{" "}
        <span className="underline underline-offset-4  decoration-[5px] decoration-(--color-primary)">
          Sign Up
        </span>{" "}
        to Fantasy Manager
      </h1>
      <p className="text-gray-300 text-lg">
        Build and Manage your ultimate team
      </p>

      <div className="flex gap-2.5 mt-2">
        <Link
          to={"/auth/sign-in"}
          className="border border-(--color-primary) font-bold py-2 px-13 rounded hover:bg-(--color-primary)"
        >
          Sign In
        </Link>
        <Link
          to={"/auth/sign-up"}
          className="bg-(--color-primary) border border-(--color-primary) font-bold py-2 px-13 rounded hover:brightness-115"
        >
          Sign Up
        </Link>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="w-1/3">
        <div className="floating-label-effect mt-4 mb-2">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            autoFocus
            autoComplete="email"
            className="pl-9"
          />

          <label htmlFor="email" className="left-10">
            Email <span className="text-red-500">*</span>
          </label>
          <i className="fa-solid fa-envelope absolute left-2 top-1/2 -translate-y-1/2"></i>
        </div>

        <div className="floating-label-effect mb-2">
          <ShowPassword autoComplete="new-password" />
        </div>

        <div className="floating-label-effect">
          <input
            type="text"
            name="userTeamName"
            id="userTeamName"
            placeholder=""
            required
            autoComplete="userTeamName"
            className="pl-9"
          />

          <label htmlFor="userTeamName" className="left-10">
            Team's name <span className="text-red-500">*</span>
          </label>
          <i className="fa-solid fa-lock absolute left-2 top-1/2 -translate-y-1/2"></i>
        </div>

        <button
          type="submit"
          className="w-full mt-3 text-lg bg-(--color-primary) border-2 border-(--color-primary) font-bold py-2 rounded hover:bg-(--color-text) hover:text-(--color-primary)"
        >
          <i className="fa-solid fa-user-plus mr-2 align-middle"></i>
          Sign Up
        </button>

        <Auth2Provider />
      </form>
    </section>
  );
};

export default SignUp;
