import { Button, useDisclosure } from "@heroui/react";
import React from "react";
import AddUserModal from "./Modal/AddUserModal";

const AddUserButtons = ({getAllUser}) => {
     const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div>
      <Button color="primary" onClick={()=>onOpen()}>Add User</Button>
      {/* add user modal  */}
      <AddUserModal isOpen={isOpen} onOpenChange={onOpenChange}  getAllUser={getAllUser}/>
    </div>
  );
};

export default AddUserButtons;
