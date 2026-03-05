import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { api_url } from "../../config";
import { AuthContext } from "../Auth/AuthContext";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import UserUpdateModal from "./Modal/userUpdateModal";
import { useDisclosure } from "@heroui/react";
import AddUserButtons from "./AddUserButtons";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const getAllUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api_url}/getuser`, {
        headers: {
          Authorization: `bearer ${token} `,
        },
        withCredentials: true,
      });
      if (res.data.success) {
        setUserList(res.data.Allusers);
      } else {
        toast.error(res?.data?.message || "unknown error");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "data fetch fail failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);
  // delete user
  const handelRemoveUser = async (_id) => {
    const comfromDeleteUser = window.confirm(
      "Are you sure? are you remove user"
    );
    if (comfromDeleteUser) {
      try {
        setLoading(true);
        const res = await axios.delete(`${api_url}/deleteUser`, {
          data: { user_id: _id },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (res?.data?.success) {
          toast.success(res?.data?.message || "unknown");
        } else {
          toast.success(res?.data?.message || "unknown");
        }
        await getAllUser();
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };
  // update user
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectUser, setSelectUser] = useState({});
  if (loading) {
    return (
      <>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <ScaleLoader color="green" />
        </div>
      </>
    );
  }
  return (
    <div className="p-5">
      <div className="flex justify-around">
        <div>

          <h2 className="text-2xl font-bold">User List </h2>
          <h2>total user <span>{userList.length}</span></h2>
        </div>
        <AddUserButtons getAllUser={getAllUser} />
      </div>
      <div className="flex flex-col mt-5">
        <div className="grid grid-cols-3 md:grid-cols-4 justify-between bg-gray-100 p-3 rounded-md font-semibold text-gray-700">
          <h2 className="hidden md:inline-block">name</h2>
          <h2>Email</h2>
          <h2>Action</h2>
          <h2>Edit</h2>
        </div>
        {userList.length > 0 ? (
          userList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 md:grid-cols-4 items-center justify-between  p-3 border-b hover:bg-gray-50 transition"
            >
              <h2 className="hidden md:inline-block">
                {item?.username || "undefind"}
              </h2>
              <h2>{item?.email || "undefind"}</h2>
              <h2>
                <Button onClick={() => handelRemoveUser(item._id)}>
                  <ImCross />
                </Button>
              </h2>
              <h2 className="cursor-pointer hover:text-blue-800 transition-all duration-300">
                <button
                  onClick={() => {
                    onOpen();
                    setSelectUser(item);
                  }}
                >
                  Edit
                </button>
              </h2>
            </div>
          ))
        ) : (
          <div className="flex justify-center mt-10 md:mt-20 font-semibold  text-2xl items-center">
            <p>user Not found</p>
          </div>
        )}
      </div>
      {/* user update modals  */}
      <UserUpdateModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        user={selectUser}
        getAllUser={getAllUser}
      />
    </div>
  );
};

export default UserList;
