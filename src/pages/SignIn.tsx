import { Link } from "react-router-dom";
import Auth2Provider from "../components/Auth2Provider";

type SignInProps = {};

const SignIn = ({}: SignInProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
    };

    console.log("User signed in:", user);
  };

  const handleGitHubLogin = () => {
    console.log("GitHub login initiated");
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
  };

  return (
    <section className="flex flex-col items-center justify-center pb-10">
      {/* <Logo width={150} height={150} /> */}
      <h1 className="font-bold text-4xl mb-2">
        <span className="underline underline-offset-4  decoration-[5px] decoration-(--color-primary)">
          Sign In
        </span>{" "}
        to Fantasy Manager
      </h1>
      <p className="text-gray-300 text-lg">
        Build and Manage your ultimate team
      </p>

      <div className="flex gap-2.5 mt-4">
        <Link
          to={"/auth/sign-in"}
          className="bg-(--color-primary) border border-(--color-primary) font-bold py-2 px-13 rounded hover:brightness-[115%]"
        >
          Sign In
        </Link>
        <Link
          to={"/auth/sign-up"}
          className="border border-(--color-text) font-bold py-2 px-13 rounded hover:brightness-[85%]"
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

        <button
          type="submit"
          className="w-full mt-3 text-lg bg-(--color-primary) border-2 border-(--color-primary) font-bold py-2  rounded hover:bg-(--color-text) hover:text-(--color-primary)"
        >
          <i className="fa-solid fa-right-to-bracket mr-2 align-middle"></i>
          Sign In
        </button>

        <Auth2Provider />
      </form>
    </section>
  );
};

export default SignIn;
