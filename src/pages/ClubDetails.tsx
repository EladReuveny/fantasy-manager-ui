import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteClub, getClubById, updateClub } from "../api/clubApi";
import { getAllCountries } from "../api/countryApi";
import ConfirmDialog from "../components/ConfirmDialog";
import FormDialog from "../components/FormDialog";
import PageTitle from "../components/PageTitle";
import PlayerCard from "../components/PlayerCard";
import useAuth from "../hooks/useAuth";
import type { Club, ClubUpdateDto } from "../types/club";
import type { Country } from "../types/country";
import { positionColors, type Player } from "../types/player";

type ClubDetailsProps = {};

const ClubDetails = ({}: ClubDetailsProps) => {
  const [club, setClub] = useState<Club | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [clubToEdit, setClubToEdit] = useState<Club | null>(null);

  const { clubId } = useParams();

  const editClubDialog = useRef<HTMLDialogElement | null>(null);
  const deleteClubDialog = useRef<HTMLDialogElement | null>(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  const goalkeepersPlayers: Player[] = [];
  const defendersPlayers: Player[] = [];
  const midfieldersPlayers: Player[] = [];
  const forwardsPlayers: Player[] = [];

  club?.players?.forEach((player) => {
    switch (player.position) {
      case "GK":
        goalkeepersPlayers.push(player);
        break;

      case "LB":
      case "CB":
      case "RB":
      case "LWB":
      case "RWB":
        defendersPlayers.push(player);
        break;

      case "CDM":
      case "CM":
      case "LM":
      case "RM":
      case "CAM":
        midfieldersPlayers.push(player);
        break;

      case "RW":
      case "LW":
      case "ST":
      case "CF":
        forwardsPlayers.push(player);
        break;

      default:
        return;
    }
  });

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const data = await getClubById(Number(clubId));
        setClub(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    fetchClub();
    fetchCountries();
  }, []);

  const showEditClubDialog = () => {
    setClubToEdit(club);
    editClubDialog?.current?.showModal();
  };

  const closeEditClubDialog = () => {
    setClubToEdit(null);
    editClubDialog?.current?.close();
  };

  const handleEditClub = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clubToEdit) {
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const countryName = (formData.get("country") as string)
      .trim()
      .toLowerCase();
    const matchedCountry = countries.find(
      (country) => country.name.toLowerCase() === countryName
    );

    const clubUpdateDto: ClubUpdateDto = {
      name: formData.get("name") as string,
      logoUrl: formData.get("logoUrl") as string,
      countryId: matchedCountry?.id,
    };

    try {
      const data = await updateClub(clubToEdit.id, clubUpdateDto);
      setClub(data);
      closeEditClubDialog();
      toast.success(`${clubToEdit.name} updated successfully.`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        closeEditClubDialog();
        toast.error(err.response?.data);
      }
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setClubToEdit((prev) =>
      prev && prev.country
        ? { ...prev, country: { ...prev.country, name: inputVal } }
        : prev
    );
  };

  const showDeleteClubDialog = () => {
    deleteClubDialog?.current?.showModal();
  };

  const closeDeleteClubDialog = () => {
    deleteClubDialog?.current?.close();
  };

  const handleDeleteClub = async () => {
    if (!club) {
      return;
    }

    try {
      const data = await deleteClub(club.id);
      setClub(null);
      closeDeleteClubDialog();
      toast.success(`${club.name} deleted successfully.`);
      navigate("/admin/clubs");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    }
  };

  return (
    <section>
      <PageTitle title="Club Details" />

      {user?.role === "ADMIN" && (
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={showEditClubDialog}
            className="border border-(--color-primary) text-(--color-primary) py-2 px-4 hover:bg-(--color-primary) hover:text-(--color-bg)"
            title="Edit"
          >
            <i className="fa-solid fa-pen mr-2"></i>Edit
          </button>
          <button
            onClick={showDeleteClubDialog}
            className="border border-red-600 text-red-600 py-2 px-4 hover:bg-red-600 hover:text-(--color-bg)"
            title="Delete"
          >
            <i className="fa-solid fa-trash mr-2"></i>Delete
          </button>
        </div>
      )}

      <div className="flex items-center justify-center gap-8 my-6 h-48">
        <img
          src={club?.logoUrl}
          alt={club?.name}
          className="rounded-full w-48 h-48 drop-shadow-[0_0_10px_var(--color-primary)]"
        />
        <div className="flex flex-col justify-between h-full">
          <h2 className="text-5xl font-bold text-(--color-primary)">
            {club?.name}
          </h2>

          <div>
            <img
              src={club?.country?.flagUrl}
              alt={club?.country?.name}
              title={club?.country?.name}
              className="w-10 h-10 object-fill rounded-full drop-shadow-[0_0_2px_var(--color-text)] inline-block mr-3"
            />
            <span className="font-bold">{club?.country?.isoCode}</span>
          </div>
          <span className="text-gray-400">
            Founded:{" "}
            {club?.establishedAt && new Date(club?.establishedAt).getFullYear()}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="bg-(--color-text)/10 p-4 rounded-lg">
          <h3 className="text-3xl font-bold mb-4">
            <i className="fa-solid fa-trophy mr-3"></i>
            Competitions
          </h3>
          <div className="flex items-center flex-wrap gap-4 mb-8">
            {club?.competitions?.length && club.competitions.length > 0 ? (
              club.competitions.map((competition) => (
                <img
                  key={competition.id}
                  src={competition.logoUrl}
                  alt={competition.name}
                  title={competition.name}
                  className="w-12 h-12 object-contain"
                />
              ))
            ) : (
              <span className="font-bold text-gray-400 italic">N/A</span>
            )}
          </div>
        </div>
        <div className="bg-(--color-text)/10 p-4 rounded-lg">
          <h3 className="text-3xl font-bold mb-4">
            <i className="fa-solid fa-users mr-3"></i>
            Squad
          </h3>
          <div className="flex flex-col gap-3">
            <div className="mb-5">
              <h4
                className={`text-2xl font-bold border-l-2 ${positionColors.GK.join(
                  " "
                )} py-1.5 px-3 mb-3`}
              >
                <i className="fa-solid fa-mitten mr-2"></i>
                Goalkeepers
              </h4>
              {goalkeepersPlayers?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {goalkeepersPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              ) : (
                <span className="font-bold text-gray-400 italic">N/A</span>
              )}
            </div>
            <div className="mb-5">
              <h4
                className={`text-2xl font-bold border-l-2 ${positionColors.CB.join(
                  " "
                )} py-1.5 px-3 mb-3`}
              >
                <i className="fa-solid fa-shield-alt mr-2"></i>
                Defenders
              </h4>
              {defendersPlayers?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {defendersPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              ) : (
                <span className="font-bold text-gray-400 italic">N/A</span>
              )}
            </div>
            <div className="mb-5">
              <h4
                className={`text-2xl font-bold border-l-2 ${positionColors.CM.join(
                  " "
                )} py-1.5 px-3 mb-3`}
              >
                <i className="fa-solid fa-futbol mr-2"></i>
                Midfielders
              </h4>
              {midfieldersPlayers?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {midfieldersPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              ) : (
                <span className="font-bold text-gray-400 italic">N/A</span>
              )}
            </div>
            <div className="">
              <h4
                className={`text-2xl font-bold border-l-2 ${positionColors.ST.join(
                  " "
                )} py-1.5 px-3 mb-3`}
              >
                <i className="fa-solid fa-bullseye mr-2"></i>
                Forwards
              </h4>
              {forwardsPlayers?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {forwardsPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              ) : (
                <span className="font-bold text-gray-400 italic">N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <FormDialog
        dialogRef={editClubDialog}
        title="Edit Club"
        onClose={closeEditClubDialog}
        onSubmit={handleEditClub}
      >
        <div className="floating-label-effect">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=""
            value={clubToEdit?.name}
            onChange={(e) =>
              setClubToEdit((prev) =>
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
            type="text"
            id="logoUrl"
            name="logoUrl"
            placeholder=""
            value={clubToEdit?.logoUrl}
            onChange={(e) =>
              setClubToEdit((prev) =>
                prev ? { ...prev, logoUrl: e.target.value } : null
              )
            }
            className="pl-3"
            required
          />
          <label htmlFor="logoUrl" className="left-4">
            Logo URL <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="search"
            id="country"
            name="country"
            placeholder=""
            list="countries-list"
            value={clubToEdit?.country?.name}
            onChange={(e) => handleCountryChange(e)}
            className="pl-3"
            required
          />
          <label htmlFor="country" className="left-4">
            Country <span className="text-red-500">*</span>
          </label>
          <datalist id="countries-list">
            {countries.map((country) => (
              <option key={country.id} value={country.name} />
            ))}
          </datalist>
        </div>
      </FormDialog>
      <ConfirmDialog
        dialogRef={deleteClubDialog}
        message="Are you sure you want to delete the club "
        item={club?.name || ""}
        onConfirm={handleDeleteClub}
        onClose={closeDeleteClubDialog}
      />
    </section>
  );
};

export default ClubDetails;
