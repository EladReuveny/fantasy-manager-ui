import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllPlayers } from "../api/playerApi";
import { addPlayerToUserTeam, getUserTeamById } from "../api/userTeamApi";
import ConfirmDialog from "../components/ConfirmDialog";
import PageTitle from "../components/PageTitle";
import PlayerCard from "../components/PlayerCard";
import useAuth from "../hooks/useAuth";
import type { Player } from "../types/player";
import type { Formation, UserTeam } from "../types/userTeam";

type TransferMarketProps = {};

const TransferMarket = ({}: TransferMarketProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [playerToBuy, setPlayerToBuy] = useState<Player | null>(null);
  const [userTeam, setUserTeam] = useState<UserTeam | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const buyPlayerDialog = useRef<HTMLDialogElement | null>(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  // const formationMap = {
  useEffect(() => {
    if (!searchQuery) {
      setFilteredPlayers(players);
      return;
    }

    const filtered = players.filter((player) =>
      player.name.toLocaleLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    setFilteredPlayers(filtered);
  }, [searchQuery, players]);

  const formationMap: Record<string, Formation> = {
    FOUR_FOUR_TWO: "4-4-2",
    FOUR_THREE_THREE: "4-3-3",
    FOUR_TWO_THREE_ONE: "4-2-3-1",
    FOUR_ONE_TWO_ONE_TWO: "4-1-2-1-2",
    FOUR_ONE_FOUR_ONE: "4-1-4-1",
    FOUR_FIVE_ONE: "4-5-1",
    THREE_FIVE_TWO: "3-5-2",
    THREE_FOUR_THREE: "3-4-3",
    THREE_SIX_ONE: "3-6-1",
    THREE_THREE_THREE_ONE: "3-3-3-1",
    FIVE_THREE_TWO: "5-3-2",
    FIVE_FOUR_ONE: "5-4-1",
    FOUR_THREE_TWO_ONE: "4-3-2-1",
    FOUR_TWO_TWO_TWO: "4-2-2-2",
    FOUR_TWO_FOUR: "4-2-4",
  };

  const totalCost = playerToBuy
    ? playerToBuy.marketValue + playerToBuy.wage
    : 0;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getAllPlayers();
        setPlayers(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    const fetchUserTeam = async () => {
      if (!user) {
        return;
      }
      try {
        const data = await getUserTeamById(user.userTeam.id);
        setUserTeam(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    fetchPlayers();
    fetchUserTeam();
  }, []);

  const showBuyPlayerDialog = (player: Player) => {
    setPlayerToBuy(player);
    buyPlayerDialog?.current?.showModal();
  };

  const closeBuyPlayerDialog = () => {
    setPlayerToBuy(null);
    buyPlayerDialog?.current?.close();
  };

  const handleBuyPlayer = async () => {
    if (!user) {
      navigate("/auth/sign-in");
      toast.error("Please sign in first.");
      return;
    }

    if (!playerToBuy) {
      return;
    }

    try {
      const data = addPlayerToUserTeam(user.userTeam.id, playerToBuy.id);
      toast.success("Player bought successfully.");
      closeBuyPlayerDialog();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    }
  };

  return (
    <section>
      <PageTitle title="Transfer Market" />

      {user && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 mt-4">
          <div className="flex flex-col bg-(--color-primary)/20 py-3 px-4 rounded-lg hover:backdrop-brightness-140">
            <div className="text-center text-2xl font-bold mb-1">
              <i className="fa-solid fa-user text-(--color-primary)"></i>
              <h2> Team's Info</h2>
            </div>
            <div className="text-gray-300">
              <p>
                Name: <span className="font-bold">{userTeam?.name}</span>
              </p>
              <p>
                Owners:{" "}
                <span className="font-bold">
                  {user?.email.slice(0, user.email.indexOf("@"))}
                </span>
              </p>
              <p>
                Formation:{" "}
                <span className="font-bold">
                  {userTeam?.formation && formationMap[userTeam.formation]}
                </span>
              </p>
              <p>
                Captain:{" "}
                <span className="font-bold">{userTeam?.captain?.name}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-(--color-primary)/20 py-3 px-4 rounded-lg hover:backdrop-brightness-140">
            <div className="text-center text-2xl font-bold mb-1">
              <i className="fa-solid fa-coins text-(--color-primary)"></i>
              <h2> Financial Info</h2>
            </div>
            <div className="text-gray-300">
              <p>
                Market Value:{" "}
                <span className="font-bold">${userTeam?.marketValue}M</span>{" "}
              </p>
              <p>
                Budget: <span className="font-bold">${userTeam?.budget}M</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col bg-(--color-primary)/20 py-3 px-4 rounded-lg hover:backdrop-brightness-140">
            <div className="text-center text-2xl font-bold mb-1">
              <i className="fa-solid fa-star text-(--color-primary)"></i>
              <h2> Team's Strength</h2>
            </div>
            <div className="text-gray-300">
              <p>
                Overall Rating:{" "}
                <div className="relative inline-block text-yellow-400">
                  {/* Gray stars (background) */}
                  <div className="flex space-x-1 text-gray-300">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>

                  {/* Yellow stars (foreground) clipped by width */}
                  <div
                    className="absolute top-0 left-0 flex space-x-1 overflow-hidden whitespace-nowrap"
                    style={{ width: `${userTeam?.overallRating || 0}%` }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                </div>
                <span className="font-bold">({userTeam?.overallRating})</span>{" "}
              </p>
              <p>
                Points: <span className="font-bold">{userTeam?.points}</span>
              </p>
              <p>
                Rank:{" "}
                <span className="font-bold">
                  {userTeam?.rank} / {players.length}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative flex items-center my-6">
        <i className="fa-solid fa-magnifying-glass text-gray-300 mr-1 absolute left-2"></i>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-b border-gray-300 py-1 pl-10 hover:border-(--color-text) focus:border-(--color-primary)"
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 mt-4">
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            showBuyPlayerDialog={showBuyPlayerDialog}
          />
        ))}
      </div>

      <ConfirmDialog
        dialogRef={buyPlayerDialog}
        message={`Are you sure you want to purchase for $${totalCost}M the player `}
        item={playerToBuy?.name || ""}
        onConfirm={handleBuyPlayer}
        onClose={closeBuyPlayerDialog}
      />
    </section>
  );
};

export default TransferMarket;
