import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllClubs } from "../api/clubApi";
import { getAllCountries } from "../api/countryApi";
import {
  createPlayer,
  deletePlayer,
  getAllPlayers,
  updatePlayer,
} from "../api/playerApi";
import ConfirmDialog from "../components/ConfirmDialog";
import FormDialog from "../components/FormDialog";
import PageTitle from "../components/PageTitle";
import type { Club } from "../types/club";
import type { Country } from "../types/country";
import {
  positionColors,
  type Player,
  type PlayerCreateDto,
  type PlayerUpdateDto,
  type Position,
} from "../types/player";

type PlayersManagementProps = {};

const PlayersManagement = ({}: PlayersManagementProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
  const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [nationalities, setNationalities] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const positions: {
    value: Position;
    label: string;
  }[] = [
    { value: "GK", label: "Goalkeeper" },
    { value: "LB", label: "Left Back" },
    { value: "CB", label: "Center Back" },
    { value: "RB", label: "Right Back" },
    { value: "LWB", label: "Left Wing Back" },
    { value: "RWB", label: "Right Wing Back" },
    { value: "CDM", label: "Central Defensive Midfielder" },
    { value: "CM", label: "Central Midfielder" },
    { value: "LM", label: "Left Midfielder" },
    { value: "RM", label: "Right Midfielder" },
    { value: "CAM", label: "Central Attacking Midfielder" },
    { value: "RW", label: "Right Winger" },
    { value: "LW", label: "Left Winger" },
    { value: "ST", label: "Striker" },
    { value: "CF", label: "Center Forward" },
  ];

  const addPlayerDialog = useRef<HTMLDialogElement | null>(null);
  const editPlayerDialog = useRef<HTMLDialogElement | null>(null);
  const deletePlayerDialog = useRef<HTMLDialogElement | null>(null);
  const filterDialog = useRef<HTMLDialogElement | null>(null);

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

    const fetchClubs = async () => {
      try {
        const data = await getAllClubs();
        setClubs(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setNationalities(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    fetchPlayers();
    fetchClubs();
    fetchCountries();
  }, []);

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

  const showAddPlayerDialog = () => {
    addPlayerDialog?.current?.showModal();
  };

  const closeAddPlayerDialog = () => {
    addPlayerDialog?.current?.close();
  };

  const handleAddPlayer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const clubName = (formData.get("club") as string).trim().toLowerCase();
    const matchedClub = clubs.find((club) => club.name === clubName);

    const nationalityName = (formData.get("nationality") as string)
      .trim()
      .toLowerCase();
    const matchedNationality = nationalities.find(
      (nationality) => nationality.name.toLowerCase() === nationalityName
    );

    if (!matchedNationality) {
      toast.error("Nationality not found.");
      return;
    }

    const player: PlayerCreateDto = {
      name: formData.get("name") as string,
      age: Number(formData.get("age")) as number,
      position: formData.get("position") as Position,
      rating: Number(formData.get("rating")) as number,
      marketValue: Number(formData.get("marketValue")) as number,
      wage: Number(formData.get("wage")) as number,
      imageUrl: formData.get("imageUrl") as string,
      clubId: matchedClub?.id,
      nationalityId: matchedNationality?.id,
    };

    try {
      const data = await createPlayer(player);
      setPlayers((prev) => [...prev, data]);
      closeAddPlayerDialog();
      toast.success("Player added successfully.");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data);
        toast.error(err.response?.data);
      }
    }
  };

  const showEditPlayerDialog = (player: Player) => {
    setPlayerToEdit(player);
    editPlayerDialog?.current?.showModal();
  };

  const closeEditPlayerDialog = () => {
    setPlayerToEdit(null);
    editPlayerDialog?.current?.close();
  };

  const handleEditPlayer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const clubName = (formData.get("club") as string).trim().toLowerCase();
    const matchedClub = clubs.find(
      (club) => club.name.toLowerCase() === clubName
    );

    const nationalityName = (formData.get("nationality") as string)
      .trim()
      .toLowerCase();

    const matchedNationality = nationalities.find(
      (nationality) => nationality.name.toLowerCase() === nationalityName
    );

    const playerUpdateDto: PlayerUpdateDto = {
      name: formData.get("name") as string,
      age: Number(formData.get("age")) as number,
      position: formData.get("position") as Position,
      rating: Number(formData.get("rating")) as number,
      marketValue: Number(formData.get("marketValue")) as number,
      wage: Number(formData.get("wage")) as number,
      imageUrl: formData.get("imageUrl") as string,
      clubId: matchedClub?.id,
      nationalityId: matchedNationality?.id,
    };

    if (playerToEdit?.id) {
      try {
        const data = await updatePlayer(playerToEdit.id, playerUpdateDto);
        setPlayers((prev) =>
          prev.map((player) => (player.id === playerToEdit.id ? data : player))
        );
        closeEditPlayerDialog();
        toast.success("Player updated successfully.");
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.error(err.response?.data);
          toast.error(err.response?.data);
        }
      }
    }
  };

  const showDeletePlayerDialog = (player: Player) => {
    setPlayerToDelete(player);
    deletePlayerDialog?.current?.showModal();
  };

  const closeDeletePlayerDialog = () => {
    setPlayerToDelete(null);
    deletePlayerDialog?.current?.close();
  };

  const handleDeletePlayer = async () => {
    if (!playerToDelete) {
      return;
    }

    try {
      const data = await deletePlayer(playerToDelete.id);
      setPlayers((prev) =>
        prev.filter((player) => player.id !== playerToDelete.id)
      );
      closeDeletePlayerDialog();
      toast.success(`${playerToDelete.name} deleted successfully.`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data);
        toast.error(err.response?.data);
      }
    }
  };

  const handleClubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setPlayerToEdit((prev) =>
      prev && prev.club
        ? { ...prev, club: { ...prev.club, name: inputVal } }
        : prev
    );

    const matchedClub = clubs.find(
      (club) => club.name.toLowerCase() === inputVal.toLowerCase()
    );

    if (matchedClub) {
      setPlayerToEdit((prev) => (prev ? { ...prev, club: matchedClub } : null));
    }
  };

  const handleNationalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setPlayerToEdit((prev) =>
      prev && prev.nationality
        ? { ...prev, nationality: { ...prev.nationality, name: inputVal } }
        : prev
    );

    const matchedNationality = nationalities.find(
      (nationality) => nationality.name.toLowerCase() === inputVal.toLowerCase()
    );

    if (matchedNationality) {
      setPlayerToEdit((prev) =>
        prev ? { ...prev, nationality: matchedNationality } : null
      );
    }
  };

  const showFilterDialog = () => {
    filterDialog?.current?.show();
  };

  const closeFilterDialog = () => {
    filterDialog?.current?.close();
  };

  return (
    <section>
      <PageTitle title="Players Management" />

      <div className="flex justify-between items-center my-6">
        <div className="relative flex items-center">
          <div>
            <i className="fa-solid fa-magnifying-glass text-gray-300 mr-1 absolute left-2 top-1/2 -translate-y-1/2"></i>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-b border-gray-300 py-1 pl-10 hover:border-(--color-text) focus:border-(--color-primary)"
            />

            <button
              onClick={() => setSearchQuery("")}
              className="relative right-4 align-middle text-gray-400 hover:brightness-140"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <button onClick={showFilterDialog}>
            <span className="material-symbols-outlined text-gray-400 align-middle -ml-1 hover:brightness-140">
              tune
            </span>
          </button>
          <dialog
            ref={filterDialog}
            className="absolute top-0 left-full bg-(--color-bg) text-(--color-text) py-4 px-6 rounded-2xl backdrop:backdrop-brightness-25 backdrop:backdrop-blur-md"
          >
            <button
              onClick={closeFilterDialog}
              className="absolute top-0.5 right-0.5 text-sm rounded-full hover:brightness-85"
            >
              <i className="fas fa-times"></i>
            </button>
          </dialog>
        </div>

        <button
          className="border border-(--color-primary) text-(--color-primary) py-2 px-4 rounded hover:bg-(--color-primary) hover:text-(--color-bg)"
          onClick={showAddPlayerDialog}
        >
          <i className="fa-solid fa-plus"></i>
          Add Player
        </button>
      </div>

      <table className="w-full text-center align-middle font-bold">
        <thead className="bg-(--color-text) text-(--color-bg)">
          <tr className="font-bold">
            <th>#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Position</th>
            <th className="p-2">Rating</th>
            <th className="p-2">Market Value</th>
            <th className="p-2">Wage</th>
            <th className="p-2">Image</th>
            <th className="p-2">Club</th>
            <th className="p-2">Nationality</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player, index) => (
            <tr
              key={player.id}
              className="border-b border-gray-500 odd:bg-(--color-text)/10 even:bg-(--color-text)/20 hover:bg-(--color-primary)/50"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                <Link
                  to={`/players/${player.id}`}
                  title="View player details"
                  className="underline underline-offset-2 hover:text-(--color-primary)"
                >
                  {player.name}
                </Link>
              </td>
              <td className="p-2">{player.age}</td>
              <td className={`p-2 ${positionColors[player.position][0]}`}>
                {player.position}
              </td>
              <td className="p-2">{player.rating}</td>
              <td className="p-2">${player.marketValue}M</td>
              <td className="p-2">${player.wage}M</td>
              <td className="p-2">
                <img
                  src={player.imageUrl}
                  alt={player.name}
                  className="object-fill w-16 h-16 inline-block"
                />
              </td>
              <td className="p-2">
                {player.club?.logoUrl ? (
                  <img
                    src={player.club.logoUrl}
                    alt={player.club.name}
                    className="object-contain w-7 h-7 inline-block"
                  />
                ) : (
                  "F/A"
                )}
              </td>
              <td className="p-2">
                <img
                  src={player.nationality?.flagUrl}
                  alt={player.nationality?.name}
                  className="object-contain w-7 h-7 inline-block"
                />
              </td>
              <td className="p-2">
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => showEditPlayerDialog(player)}
                    className="text-gray-300 hover:brightness-115"
                    title="Edit"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    onClick={() => showDeletePlayerDialog(player)}
                    className="text-red-500 hover:brightness-200"
                    title="Delete"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FormDialog
        dialogRef={addPlayerDialog}
        title="Add Player"
        onClose={closeAddPlayerDialog}
        onSubmit={handleAddPlayer}
      >
        <div className="floating-label-effect">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=""
            className="pl-3"
            required
          />
          <label htmlFor="name" className="left-4">
            Name <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="number"
            id="age"
            name="age"
            placeholder=""
            className="pl-3"
            required
          />
          <label htmlFor="age" className="left-4">
            Age <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <select
            id="position"
            name="position"
            defaultValue={""}
            className="pl-3"
          >
            <option value="" disabled>
              --- Select a position ---
            </option>
            {positions.map((position, index) => (
              <option key={index} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
          <label htmlFor="position" className="left-4">
            Position <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="number"
            id="rating"
            name="rating"
            placeholder=""
            className="pl-3"
            required
          />
          <label htmlFor="rating" className="left-4">
            Rating <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="number"
            id="marketValue"
            name="marketValue"
            placeholder=""
            className="pl-3"
            required
          />
          <label htmlFor="marketValue" className="left-4">
            Market Value <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="number"
            id="wage"
            name="wage"
            placeholder=""
            className="pl-3"
            required
          />
          <label htmlFor="wage" className="left-4">
            Wage <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder=""
            className="pl-3"
            required
          />
          <label htmlFor="imageUrl" className="left-4">
            Image URL <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="search"
            id="club"
            name="club"
            placeholder=""
            list="clubs-list"
            className="pl-3"
          />
          <label htmlFor="club" className="left-4">
            Club
          </label>
          <datalist id="clubs-list">
            {clubs.map((club) => (
              <option key={club.id} value={club.name} />
            ))}
          </datalist>
        </div>

        <div className="floating-label-effect">
          <input
            type="search"
            id="nationality"
            name="nationality"
            placeholder=""
            list="nationalities-list"
            className="pl-3"
            required
          />
          <label htmlFor="nationality" className="left-4">
            Nationality <span className="text-red-500">*</span>
          </label>
          <datalist id="nationalities-list">
            {nationalities.map((nationality) => (
              <option key={nationality.id} value={nationality.name} />
            ))}
          </datalist>
        </div>
      </FormDialog>
      <ConfirmDialog
        dialogRef={deletePlayerDialog}
        message="Are you sure you want to delete the player "
        item={playerToDelete?.name || ""}
        onConfirm={handleDeletePlayer}
        onClose={closeDeletePlayerDialog}
      />
      <FormDialog
        dialogRef={editPlayerDialog}
        title="Edit Player"
        onClose={closeEditPlayerDialog}
        onSubmit={handleEditPlayer}
      >
        <div className="floating-label-effect">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=""
            value={playerToEdit?.name}
            onChange={(e) =>
              setPlayerToEdit((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
            className="pl-3"
            required
          />
          <label htmlFor="name" className="left-4">
            Name <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="number"
            id="age"
            name="age"
            placeholder=""
            value={playerToEdit?.age}
            onChange={(e) =>
              setPlayerToEdit((prev) =>
                prev ? { ...prev, age: Number(e.target.value) } : null
              )
            }
            className="pl-3"
            required
          />
          <label htmlFor="age" className="left-4">
            Age <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <select
            id="position"
            name="position"
            value={playerToEdit?.position}
            onChange={(e) =>
              setPlayerToEdit((prev) =>
                prev ? { ...prev, position: e.target.value as Position } : null
              )
            }
            className="pl-3"
            required
          >
            <option value="" disabled>
              --- Select a position ---
            </option>
            {positions.map((position, index) => (
              <option key={index} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
          <label htmlFor="position" className="left-4">
            Position <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="number"
            id="rating"
            name="rating"
            placeholder=""
            value={playerToEdit?.rating}
            onChange={(e) =>
              setPlayerToEdit((prev) =>
                prev ? { ...prev, rating: Number(e.target.value) } : null
              )
            }
            className="pl-3"
            required
          />
          <label htmlFor="rating" className="left-4">
            Rating <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="number"
            id="marketValue"
            name="marketValue"
            placeholder=""
            value={playerToEdit?.marketValue}
            onChange={(e) =>
              setPlayerToEdit((prev) =>
                prev ? { ...prev, marketValue: Number(e.target.value) } : null
              )
            }
            className="pl-3"
            required
          />
          <label htmlFor="marketValue" className="left-4">
            Market Value <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="number"
            id="wage"
            name="wage"
            placeholder=""
            value={playerToEdit?.wage}
            onChange={(e) =>
              setPlayerToEdit((prev) =>
                prev ? { ...prev, wage: Number(e.target.value) } : null
              )
            }
            className="pl-3"
            required
          />
          <label htmlFor="wage" className="left-4">
            Wage <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder=""
            value={playerToEdit?.imageUrl}
            onChange={(e) =>
              setPlayerToEdit((prev) =>
                prev ? { ...prev, imageUrl: e.target.value } : null
              )
            }
            className="pl-3"
            required
          />
          <label htmlFor="imageUrl" className="left-4">
            Image URL <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="search"
            id="club"
            name="club"
            placeholder=""
            list="clubs-list"
            value={playerToEdit?.club?.name}
            onChange={(e) => handleClubChange(e)}
            className="pl-3"
          />
          <label htmlFor="club" className="left-4">
            Club
          </label>
          <datalist id="clubs-list">
            {clubs.map((club) => (
              <option key={club.id} value={club.name} />
            ))}
          </datalist>
        </div>

        <div className="floating-label-effect">
          <input
            type="search"
            id="nationality"
            name="nationality"
            placeholder=""
            list="nationalities-list"
            value={playerToEdit?.nationality?.name}
            onChange={(e) => handleNationalityChange(e)}
            className="pl-3"
            required
          />
          <label htmlFor="nationality" className="left-4">
            Nationality <span className="text-red-500">*</span>
          </label>
          <datalist id="nationalities-list">
            {nationalities.map((nationality) => (
              <option key={nationality.id} value={nationality.name} />
            ))}
          </datalist>
        </div>
      </FormDialog>
    </section>
  );
};

export default PlayersManagement;
