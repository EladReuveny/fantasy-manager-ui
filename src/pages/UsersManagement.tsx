import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUser, getAllUsers, updateUser } from "../api/userApi";
import ConfirmDialog from "../components/ConfirmDialog";
import PageTitle from "../components/PageTitle";
import type { Role, User, UserUpdateDto } from "../types/user";

type UsersManagementProps = {};

const UsersManagement = ({}: UsersManagementProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const roles: {
    value: Role;
    label: string;
  }[] = [
    { value: "USER", label: "User" },
    { value: "ADMIN", label: "Admin" },
  ];

  const deleteUserDialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data);
        }
      }
    };

    fetchUsers();
  }, []);

  const showDeleteUserDialog = (user: User) => {
    setUserToDelete(user);
    deleteUserDialog?.current?.showModal();
  };

  const closeDeleteUserDialog = () => {
    setUserToDelete(null);
    deleteUserDialog?.current?.close();
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) {
      return;
    }

    try {
      const data = await deleteUser(userToDelete?.id);
      setUserToDelete(null);
      closeDeleteUserDialog();
      toast.success(`${userToDelete.email} deleted successfully.`);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    }
  };

  const handleUpdateUserRole = async (
    user: User,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const userUpdatoDto: UserUpdateDto = {
      role: e.target.value as Role,
    };

    try {
      const data = await updateUser(user.id, userUpdatoDto);
      setUsers((prev) =>
        prev.map((prevUser) =>
          prevUser.id === user.id ? { ...prevUser, role: data.role } : prevUser
        )
      );
      toast.success(`${data.email}'s role updated successfully.`);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    }
  };

  return (
    <section>
      <PageTitle title="Users Management" />

      <table className="w-full text-center align-middle font-bold mt-6">
        <thead className="bg-(--color-text) text-(--color-bg)">
          <tr className="font-bold">
            <th>#</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Created At</th>
            <th className="p-2">User Team Name</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="border-b border-gray-500 odd:bg-(--color-text)/10 even:bg-(--color-text)/20 hover:bg-(--color-primary)/50"
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <select
                  name="roles-options"
                  id="roles-options"
                  value={user.role}
                  className="bg-(--color-text) text-(--color-bg) py-2 px-4 rounded appearance-none hover:bg-(--color-bg) hover:text-(--color-text)"
                  onChange={(e) => handleUpdateUserRole(user, e)}
                >
                  {roles.map((role, index) => (
                    <option key={index} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2">
                <Link to={""}>{user.userTeam.name}</Link>
              </td>
              <td className="p-2">
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => showDeleteUserDialog(user)}
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

      <ConfirmDialog
        dialogRef={deleteUserDialog}
        message="Are you sure you want to delete the user "
        item={userToDelete?.email || ""}
        onConfirm={handleDeleteUser}
        onClose={closeDeleteUserDialog}
      />
    </section>
  );
};

export default UsersManagement;
