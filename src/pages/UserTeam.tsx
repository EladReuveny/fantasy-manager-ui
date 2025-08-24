import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserTeamById } from "../api/userTeamApi";
import useAuth from "../hooks/useAuth";
import type { UserTeam } from "../types/userTeam";
import PageTitle from "../components/PageTitle";

type UserTeamProps = {};

const UserTeam = ({}: UserTeamProps) => {
  const [userTeam, setUserTeam] = useState<UserTeam | null>(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in first.");
      navigate("/auth/sign-in");
      return;
    }

    const fetchUserTeam = async () => {
      try {
        const data = await getUserTeamById(user.userTeam.id);
        setUserTeam(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    fetchUserTeam();
  }, []);

  return (
    <section>
      <PageTitle title="Your Team" />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 my-8 px-4">
        {userTeam?.players?.map((player) => (
          <div
            key={player.id}
            className="bg-(--color-primary)/15 py-8 px-4 rounded-xl hover:backdrop-brightness-130"
          >
            <i className="fas fa-user text-(--color-primary) text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">{player.name}</h3>
            <p className="text-gray-400">{player.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserTeam;
