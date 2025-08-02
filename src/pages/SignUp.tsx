import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { createUser } from "../api/userApi";
import Auth2Provider from "../components/Auth2Provider";
import type { UserCreateDto } from "../types/user";

type SignUpProps = {};

const SignUp = ({}: SignUpProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: UserCreateDto = {
      email: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
      userTeamName: (e.target as HTMLFormElement).userTeamName.value,
    };

    try {
      const res = await createUser(user);
      console.log(res.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
    }
  };

  const handleGitHubSignUp = () => {
    console.log("GitHub sign up initiated");
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up initiated");
  };

  return (
    <section className="flex flex-col items-center justify-center pb-10">
      {/* <Logo width={150} height={150} /> */}
      <h1 className="font-bold text-4xl mb-2">
        <span className="underline underline-offset-4  decoration-[5px] decoration-(--color-primary)">
          Sign Up
        </span>{" "}
        to Fantasy Manager
      </h1>
      <p className="text-gray-300 text-lg">
        Build and Manage your ultimate team
      </p>

      <div className="flex gap-2.5 mt-4">
        <Link
          to={"/auth/sign-in"}
          className="border border-(--color-text) font-bold py-2 px-13 rounded hover:brightness-[85%]"
        >
          Sign In
        </Link>
        <Link
          to={"/auth/sign-up"}
          className="bg-(--color-primary) border border-(--color-primary) font-bold py-2 px-13 rounded hover:brightness-[115%]"
        >
          Sign Up
        </Link>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="w-1/3">
        {/* Email */}
        <div className="floating-label-effect mt-5">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=""
            className="border-2 border-gray-400 rounded py-2 pl-10 w-full hover:border-(--color-text) focus:border-(--color-primary)"
          />

          <label htmlFor="email">Email</label>
          <i className="fa-solid fa-envelope absolute left-2 top-1/2 -translate-y-1/2"></i>
        </div>

        {/* Password */}
        <div className="floating-label-effect mt-4 mb-0.5">
          <input
            type="password"
            name="password"
            id="password"
            placeholder=""
            className="border-2 border-gray-400 rounded py-2 pl-10 w-full hover:border-(--color-text) focus:border-(--color-primary)"
          />

          <label htmlFor="password">Password</label>
          <i className="fa-solid fa-lock absolute left-2 top-1/2 -translate-y-1/2"></i>
        </div>

        {/* UserTeam's name */}
        <div className="floating-label-effect mt-4 mb-0.5">
          <input
            type="text"
            name="userTeamName"
            id="userTeamName"
            placeholder=""
            className="border-2 border-gray-400 rounded py-2 pl-10 w-full hover:border-(--color-text) focus:border-(--color-primary)"
          />

          <label htmlFor="userTeamName">Team's name</label>
          <i className="fa-solid fa-lock absolute left-2 top-1/2 -translate-y-1/2"></i>
        </div>

        <button
          type="submit"
          className="w-full mt-3 text-lg bg-(--color-primary) border-2 border-(--color-primary) font-bold py-2  rounded hover:bg-(--color-text) hover:text-(--color-primary)"
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
