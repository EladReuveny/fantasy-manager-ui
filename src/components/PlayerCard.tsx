import type { Player } from "../types/player";

type PlayerCardProps = {
  player: Player;
  showEditPlayerDialog?: (player: Player) => void;
  showDeletePlayerDialog?: (playerId: number) => void;
  showBuyPlayerDialog?: (player: Player) => void;
};

const PlayerCard = ({
  player,
  showEditPlayerDialog,
  showDeletePlayerDialog,
  showBuyPlayerDialog,
}: PlayerCardProps) => {
  const totalValue = player.marketValue + player.wage;

  return (
    <div className="relative bg-(--color-text)/5 rounded-lg shadow-xl overflow-hidden pb-5 hover:backdrop-brightness-140">
      <img
        src={player.imageUrl}
        alt={player.name}
        className="object-fill w-full h-40 opacity-75"
      />

      <div className="absolute top-4 left-4 font-bold">
        <p>{player.rating}</p>
        <p>{player.position}</p>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-1">
        <img
          src={player.nationality.flagUrl}
          alt={player.nationality.name}
          className="h-6 w-6 object-contain"
        />
        {player.club && (
          <img
            src={player.club.logoUrl}
            alt={player.club.name}
            className="h-6 w-6 object-contain"
          />
        )}
      </div>

      <div className="mt-3 px-2">
        <p className="text-lg font-bold text-center">{player.name}</p>
        <hr className="my-2 border-t-2 border-(--color-primary)" />
        <p>
          Market Value:{" "}
          <span className="font-bold">${player.marketValue}M</span>
        </p>
        <p>
          Wage: <span className="font-bold">${player.wage}M</span>
        </p>
        <p>
          Age: <span className="font-bold">{player.age}</span>
        </p>

        <div className="flex flex-col gap-2 mt-4">
          {showEditPlayerDialog && (
            <button
              onClick={() => showEditPlayerDialog(player)}
              className="py-2 px-4 bg-(--color-primary) rounded-md hover:brightness-110"
            >
              <i className="fas fa-edit"></i> Edit
            </button>
          )}
          {showDeletePlayerDialog && (
            <button
              onClick={() => showDeletePlayerDialog(player.id)}
              className="py-2 px-4 border border-(--color-primary) rounded-md  hover:brightness-90"
            >
              <i className="fas fa-trash mr-0.5"></i> Delete
            </button>
          )}
          {showBuyPlayerDialog && (
            <button
              onClick={() => showBuyPlayerDialog(player)}
              className="flex items-center justify-between gap-2 w-full py-2 px-4 border border-(--color-primary) bg-(--color-primary) rounded-md hover:bg-(--color-text) hover:text-(--color-primary)"
            >
              <div className="flex items-center gap-2">
                <i className="fas fa-shopping-cart"></i>
                <span>Buy</span>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <i className="fas fa-coins text-yellow-300"></i>
                <span title="Includes market value and wage">
                  ${totalValue}M
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
