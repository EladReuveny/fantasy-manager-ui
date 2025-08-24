import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createClub, deleteClub, getAllClubs } from "../api/clubApi";
import { getAllCountries } from "../api/countryApi";
import ConfirmDialog from "../components/ConfirmDialog";
import DropDownList from "../components/DropDownList";
import FormDialog from "../components/FormDialog";
import PageTitle from "../components/PageTitle";
import type { Club, ClubCreateDto } from "../types/club";
import type { Country } from "../types/country";
import type { Competition } from "../types/competition";
import { getAllCompetitions } from "../api/competitionApi";

type ClubsManagementProps = {};

const ClubsManagement = ({}: ClubsManagementProps) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetitions, setSelectedCompetitions] = useState<
    Competition[] 
  >([]);
  const [clubToDelete, setClubToDelete] = useState<Club | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const addClubDialog = useRef<HTMLDialogElement | null>(null);
  const deleteClubDialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
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
        setCountries(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    const fetchCompetitions = async () => {
      try {
        const data = await getAllCompetitions();
        setCompetitions(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    fetchClubs();
    fetchCountries();
    fetchCompetitions();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredClubs(clubs);
    }

    const filtered = clubs.filter((club) =>
      club.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    setFilteredClubs(filtered);
  }, [searchQuery, clubs]);

  const handleAddClub = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const club: ClubCreateDto = {
      name: formData.get("name") as string,
      logoUrl: formData.get("logoUrl") as string,
      countryId: Number(formData.get("country")) as number,
      establishedAt: formData.get("establishedAt")
        ? new Date(formData.get("establishedAt") as string)
        : undefined,
      competitionsIds: selectedCompetitions.map(
        (competition) => competition.id
      ),
    };

    try {
      const data = await createClub(club);
      setClubs((prev) => [...prev, data]);
      closeAddClubDialog();
      toast.success(`${club.name} added successfully.`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        closeAddClubDialog();
        toast.error(err.response?.data);
      }
    }
  };

  const showAddClubDialog = () => {
    addClubDialog?.current?.showModal();
  };

  const closeAddClubDialog = () => {
    addClubDialog?.current?.close();
  };

  const handleDeleteClub = async () => {
    if (!clubToDelete) {
      return;
    }

    try {
      const data = await deleteClub(clubToDelete.id);
      setClubs((prev) => prev.filter((club) => club.id !== clubToDelete.id));
      closeDeleteClubDialog();
      toast.success(`${clubToDelete.name} deleted successfully.`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    }
  };

  const showDeleteClubDialog = (club: Club) => {
    setClubToDelete(club);
    deleteClubDialog?.current?.showModal();
  };

  const closeDeleteClubDialog = () => {
    deleteClubDialog?.current?.close();
  };

  const handleSelectCompetition = (
    competition: Competition,
    isChecked?: boolean
  ) => {
    if (isChecked || selectedCompetitions.includes(competition)) {
      setSelectedCompetitions((prev) =>
        prev.filter((l) => l.id !== competition.id)
      );
    } else {
      setSelectedCompetitions((prev) => [...prev, competition]);
    }
  };

  const renderCompetitionItem = (competition: Competition) => {
    return (
      <>
        <img
          src={competition.logoUrl}
          alt={competition.name}
          className="object-contain w-7 h-7"
        />{" "}
        {competition.name}
      </>
    );
  };

  return (
    <section>
      <PageTitle title="Clubs Management" />

      <div className="flex justify-between items-center my-6">
        <div className="relative flex items-center">
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

          <i
            className="fa-solid fa-xmark text-gray-400 absolute right-0 cursor-pointer "
            onClick={() => setSearchQuery("")}
          ></i>
        </div>

        <button
          className="border border-(--color-primary) text-(--color-primary) py-2 px-4 rounded hover:bg-(--color-primary) hover:text-(--color-bg)"
          onClick={showAddClubDialog}
        >
          <i className="fa-solid fa-plus"></i>
          Add Club
        </button>
      </div>

      <table className="w-full text-center align-middle">
        <thead className="bg-(--color-text) text-(--color-bg)">
          <tr className="font-bold">
            <th>#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Logo</th>
            <th className="p-2">Country</th>
            <th className="p-2">Founded</th>
            <th className="p-2">Competitions</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClubs.map((club, index) => (
            <tr
              key={club.id}
              className="border-b border-gray-500 odd:bg-(--color-text)/10 even:bg-(--color-text)/20 hover:bg-(--color-primary)/50"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                <Link
                  to={`/clubs/${club.id}`}
                  title="View club details"
                  className="underline underline-offset-2 hover:text-(--color-primary)"
                >
                  {club.name}
                </Link>
              </td>
              <td className="p-2">
                <img
                  src={club.logoUrl}
                  alt={club.name}
                  title={club.name}
                  className="object-contain w-7 h-7 inline-block"
                />
              </td>
              <td className="p-2">
                <img
                  src={club.country.flagUrl}
                  alt={club.country.name}
                  title={club.country.name}
                  className="object-contain w-7 h-7 inline-block"
                />
              </td>
              <td className="p-2">
                {new Date(club.establishedAt).getFullYear()}
              </td>
              <td className="p-2">
                {club.competitions?.length && club.competitions.length > 0 ? (
                  club.competitions.length > 3 ? (
                    <div>
                      {club.competitions.slice(0, 3).map((competition) => (
                        <img
                          key={competition.id}
                          src={competition.logoUrl}
                          alt={competition.name}
                          title={competition.name}
                          className="object-contain w-7 h-7 inline-block mr-2"
                        />
                      ))}
                      <span
                        className="text-gray-400"
                        title={club.competitions
                          .slice(3)
                          .map((l) => l.name)
                          .join(", ")}
                      >
                        +{club.competitions.length - 3}
                      </span>
                    </div>
                  ) : (
                    <div>
                      {club.competitions.map((competition) => (
                        <img
                          key={competition.id}
                          src={competition.logoUrl}
                          alt={competition.name}
                          title={competition.name}
                          className="object-contain w-7 h-7 inline-block mr-2"
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="p-2">
                <button
                  onClick={() => showDeleteClubDialog(club)}
                  className="text-red-500 hover:brightness-200"
                  title="Delete"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FormDialog
        dialogRef={addClubDialog}
        title="Add Club"
        onClose={closeAddClubDialog}
        onSubmit={handleAddClub}
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
            type="text"
            id="logoUrl"
            name="logoUrl"
            placeholder=""
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
            className="pl-3"
            required
          />
          <label htmlFor="country" className="left-4">
            Country <span className="text-red-500">*</span>
          </label>
          <datalist id="countries-list">
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </datalist>
        </div>

        <div className="floating-label-effect relative w-fit">
          <i className="fa-solid fa-calendar-days absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"></i>{" "}
          <input
            type="date"
            id="establishedAt"
            name="establishedAt"
            placeholder=""
            className="pl-10 pr-2"
          />
          <label htmlFor="establishedAt" className="left-4">
            Established At
          </label>
        </div>

        <DropDownList
          items={competitions}
          selectedItems={selectedCompetitions}
          handleSelectItem={handleSelectCompetition}
          renderItem={renderCompetitionItem}
          label="Competitions"
        />
      </FormDialog>
      <ConfirmDialog
        dialogRef={deleteClubDialog}
        message="Are you sure you want to delete the club "
        item={clubToDelete?.name || ""}
        onConfirm={handleDeleteClub}
        onClose={closeDeleteClubDialog}
      />
    </section>
  );
};

export default ClubsManagement;
