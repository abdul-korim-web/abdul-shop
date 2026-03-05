import { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import axios from "axios";
import { order_api_url } from "./../../../../config";
import { AuthContext } from "./../../../Auth/AuthContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function OrderStatusUpdate({
  isOpen,
  onOpenChange,
  selectOrder,
  reFreshOrderList
}) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (selectOrder) {
      setStatus(selectOrder.orderStatus);
      console.log(selectOrder);
    }
  }, [selectOrder]);
  const { token } = useContext(AuthContext);
  //  handelStatusChange button function
  const handelStatusChange = async (onClose) => {
    try {
      setLoading(true)
      console.log(status);
      const res = await axios.patch(
        `${order_api_url}/status/${selectOrder?._id}`,
        { orderStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        
      } else{
        toast.error(res?.data?.message)
      }
      onClose()
      // refresh order list and see currenr status 
      reFreshOrderList()
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally{
      setLoading(false)

    }
  };
  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Update Order Status</ModalHeader>

            <ModalBody>
              <>
                <p className="text-sm text-gray-500">
                  Order ID: {selectOrder?._id}
                </p>
                <h2>Customer Name: {selectOrder?.customerName}</h2>
                <Select
                  label="Select Status"
                  selectedKeys={[status]}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <SelectItem key="Confirmed">Confirmed</SelectItem>
                  <SelectItem key="Pending">Pending</SelectItem>
                  <SelectItem key="shipped">Shipped</SelectItem>
                  <SelectItem key="delivered">delivered</SelectItem>
                  <SelectItem key="cancelled">cancelled</SelectItem>
                </Select>
              </>
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" color="danger" onPress={onClose}>
                Cancel
              </Button>

              <Button
                color="primary"
                // onPress={() => {
                //   console.log("Order ID:", selectOrder?._id);
                //   console.log("New Status:", status);
                //   onClose();
                // }}
                className={loading?"cursor-not-allowed" :"cursor-pointer"}
                onPress={() => handelStatusChange(onClose)}
              >
                {loading ? (
                              <>
                                updateing <ClipLoader size={20} color="#ffffff" />
                              </>
                            ) : (
                              <> Update status</>
                            )}
               
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
