import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCountry,
  deleteCountry,
  getAllCountries,
  updateCountry,
} from "../api/countryApi";
import ConfirmDialog from "../components/ConfirmDialog";
import FormDialog from "../components/FormDialog";
import PageTitle from "../components/PageTitle";
import type {
  Country,
  CountryCreateDto,
  CountryUpdateDto,
} from "../types/country";

type CountriesManagementProps = {};

const CountriesManagement = ({}: CountriesManagementProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [countryToEdit, setCountryToEdit] = useState<Country | null>(null);
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const addCountryDialog = useRef<HTMLDialogElement | null>(null);
  const editCountryDialog = useRef<HTMLDialogElement | null>(null);
  const deleteCountryDialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
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

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredCountries(countries);
    }

    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    setFilteredCountries(filtered);
  }, [countries, searchQuery]);

  const handleAddCountry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const country: CountryCreateDto = {
      name: formData.get("name") as string,
      isoCode: formData.get("isoCode") as string,
      flagUrl: formData.get("flagUrl") as string,
    };

    try {
      const data = await createCountry(country);
      setCountries((prev) => [...prev, data]);
      closeAddCountryDialog();
      toast.success(`${country.name} added successfully.`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    }
  };

  const showAddCountryDialog = () => {
    addCountryDialog?.current?.showModal();
  };

  const closeAddCountryDialog = () => {
    addCountryDialog?.current?.close();
  };

  const handleEditCountry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const country: CountryUpdateDto = {
      name: formData.get("name") as string,
      isoCode: formData.get("isoCode") as string,
      flagUrl: formData.get("flagUrl") as string,
    };

    if (!countryToEdit) {
      return;
    }

    try {
      const data = await updateCountry(countryToEdit.id, country);
      setCountries((prev) =>
        prev.map((country) =>
          country.id === countryToEdit.id ? data : country
        )
      );
      closeEditCountryDialog();
      toast.success(`${country.name} updated successfully.`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    }
  };

  const showEditCountryDialog = (country: Country) => {
    setCountryToEdit(country);
    editCountryDialog?.current?.showModal();
  };

  const closeEditCountryDialog = () => {
    setCountryToEdit(null);
    editCountryDialog?.current?.close();
  };

  const handleDeleteCountry = async () => {
    if (!countryToDelete) {
      return;
    }

    try {
      const data = await deleteCountry(countryToDelete.id);
      setCountries((prev) =>
        prev.filter((country) => country.id !== countryToDelete.id)
      );
      closeDeleteCountryDialog();
      toast.success(`${countryToDelete.name} deleted successfully.`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    }
  };

  const showDeleteCountryDialog = (country: Country) => {
    setCountryToDelete(country);
    deleteCountryDialog?.current?.showModal();
  };

  const closeDeleteCountryDialog = () => {
    deleteCountryDialog?.current?.close();
  };

  return (
    <section>
      <PageTitle title="Countries Management" />

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
            className="fa-solid fa-xmark text-gray-400 absolute right-0 cursor-pointer"
            onClick={() => setSearchQuery("")}
          ></i>
        </div>

        <button
          className="border border-(--color-primary) text-(--color-primary) py-2 px-4 rounded hover:bg-(--color-primary) hover:text-(--color-bg)"
          onClick={showAddCountryDialog}
        >
          <i className="fa-solid fa-plus"></i>
          Add Country
        </button>
      </div>

      <table className="w-full text-center align-middle">
        <thead className="bg-(--color-text) text-(--color-bg)">
          <tr className="font-bold">
            <th>#</th>
            <th className="p-2">Name</th>
            <th className="p-2">ISO Code</th>
            <th className="p-2">Flag</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country, index) => (
            <tr
              key={country.id}
              className="border-b border-gray-500 odd:bg-(--color-text)/10 even:bg-(--color-text)/20 hover:bg-(--color-primary)/50"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                <Link
                  to={`/countries/${country.id}`}
                  title="View country details"
                  className="underline underline-offset-2 hover:text-(--color-primary)"
                >
                  {country.name}
                </Link>
              </td>
              <td className="p-2">{country.isoCode}</td>
              <td className="p-2">
                <img
                  src={country.flagUrl}
                  alt={country.name}
                  className="object-contain w-7 h-7 inline-block"
                />
              </td>
              <td className="p-2">
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => showEditCountryDialog(country)}
                    className="text-gray-300 hover:brightness-115"
                    title="Edit"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    onClick={() => showDeleteCountryDialog(country)}
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
        dialogRef={addCountryDialog}
        title="Add Country"
        onClose={closeAddCountryDialog}
        onSubmit={handleAddCountry}
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
            id="isoCode"
            name="isoCode"
            placeholder=""
            className="pl-3"
            required
          />
          <label htmlFor="isoCode" className="left-4">
            ISO Code <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="text"
            id="flagUrl"
            name="flagUrl"
            placeholder=""
            className="pl-3"
            required
          />
          <label htmlFor="flagUrl" className="left-4">
            Flag URL <span className="text-red-500">*</span>
          </label>
        </div>
      </FormDialog>
      <ConfirmDialog
        dialogRef={deleteCountryDialog}
        message="Are you sure you want to delete the country "
        item={countryToDelete?.name || ""}
        onConfirm={handleDeleteCountry}
        onClose={closeDeleteCountryDialog}
      />
      <FormDialog
        dialogRef={editCountryDialog}
        title="Edit Country"
        onClose={closeEditCountryDialog}
        onSubmit={handleEditCountry}
      >
        <div className="floating-label-effect">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=""
            value={countryToEdit?.name}
            onChange={(e) =>
              setCountryToEdit((prev) =>
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
            id="isoCode"
            name="isoCode"
            placeholder=""
            value={countryToEdit?.isoCode}
            onChange={(e) =>
              setCountryToEdit((prev) =>
                prev ? { ...prev, isoCode: e.target.value } : null
              )
            }
            className="pl-3"
            required
          />
          <label htmlFor="isoCode" className="left-4">
            ISO Code <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="floating-label-effect">
          <input
            type="text"
            id="flagUrl"
            name="flagUrl"
            placeholder=""
            value={countryToEdit?.flagUrl}
            onChange={(e) =>
              setCountryToEdit((prev) =>
                prev ? { ...prev, flagUrl: e.target.value } : null
              )
            }
            className="pl-3"
            required
          />
          <label htmlFor="flagUrl" className="left-4">
            Flag URL <span className="text-red-500">*</span>
          </label>
        </div>
      </FormDialog>
    </section>
  );
};

export default CountriesManagement;
