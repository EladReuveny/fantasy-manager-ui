type Auth2ProviderProps = {};

const Auth2Provider = ({}: Auth2ProviderProps) => {
  return (
    <>
      <div className="flex items-center gap-2 my-3">
        <hr className="flex-grow border-t-1 border-gray-200" />
        <span className="text-lg text-gray-200">or</span>
        <hr className="flex-grow border-t-1 border-gray-200" />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleGitHubSignIn()}
          className="flex justify-center items-center gap-2 py-2 border border-(--color-text) rounded bg-(--color-text) text-(--color-bg) hover:bg-(--color-bg) hover:text-(--color-text)"
        >
          <i className="fab fa-github text-xl"></i>
          <span>Continue with GitHub</span>
        </button>
        <button
          onClick={() => handleGoogleSignIn()}
          className="flex justify-center items-center gap-2 py-2 border border-(--color-text) rounded bg-(--color-text) text-(--color-bg) hover:bg-(--color-bg) hover:text-(--color-text)"
        >
          <i className="fab fa-google text-xl"></i>
          <span>Continue with Google</span>
        </button>
      </div>
    </>
  );
};

export default Auth2Provider;
