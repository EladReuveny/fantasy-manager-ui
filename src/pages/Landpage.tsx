import { Link } from "react-router-dom";

type LandpageProps = {};

const Landpage = ({}: LandpageProps) => {
  return (
    <section className="text-center">
      <h1 className="text-5xl font-bold mb-8 px-14 leading-14">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-(--color-primary) to-(--color-accent) bg-clip-text text-transparent">
          Fantasy Manager
        </span>{" "}
        and Build Your{" "}
        <span className="underline decoration-(--color-primary) decoration-5 underline-offset-10">
          Ultimate Team
        </span>
      </h1>
      <p className="text-gray-300 text-2xl px-14">
        Manage transfers, build dream teams, and climb the leaderboard in the
        ultimate fantasy football manager experience.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 my-8 px-4">
        <div className="bg-(--color-primary)/15 py-8 px-4 rounded-xl hover:backdrop-brightness-130">
          <i className="fas fa-exchange-alt text-(--color-primary) text-4xl mb-4"></i>
          <h3 className="text-2xl font-bold mb-2">Real Player Transfers</h3>
          <p className="text-gray-400">
            Buy/sell based on real market value and build your ultimate squad.
          </p>
        </div>
        <div className="bg-(--color-primary)/15 py-8 px-4 rounded-xl hover:backdrop-brightness-130">
          <i className="fas fa-star text-(--color-primary) text-4xl mb-4"></i>
          <h3 className="text-2xl font-bold mb-2">Dream Team Builder</h3>
          <p className="text-gray-400">
            Create your all-time 11XI and let others vote for your team.
          </p>
        </div>
        <div className="bg-(--color-primary)/15 py-8 px-4 rounded-xl hover:backdrop-brightness-130">
          <i className="fas fa-trophy text-(--color-primary) text-4xl mb-4"></i>
          <h3 className="text-2xl font-bold mb-2">XP & Rewards</h3>
          <p className="text-gray-400">
            Earn XP, unlock features, and rise through the ranks.
          </p>
        </div>
      </div>

      <div className="py-12  bg-gradient-to-r from-(--color-primary)/80 via-(--color-primary)/40 to-(--color-primary)/5">
        <h2 className="text-3xl  font-bold  mb-6">
          Ready to Manage Your Squad?
        </h2>
        <button>
          <Link
            to={"/team"}
            className="bg-(--color-text) text-(--color-primary) font-bold py-3 px-8 rounded-full border-2 border-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-text)"
          >
            Get Started
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Landpage;
