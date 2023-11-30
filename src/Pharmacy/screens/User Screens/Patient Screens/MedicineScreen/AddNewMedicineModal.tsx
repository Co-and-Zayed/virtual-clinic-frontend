import { Form, Input, Modal, Select, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useFunctions } from "hooks/useFunctions";
import { set } from "mongoose";

interface AddNewMedicineModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddMedicine: () => void;
}

const AddNewMedicineModal: FC<AddNewMedicineModalProps> = ({
  visible,
  setVisible,
  handleAddMedicine,
}) => {
  const { userType, userData } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { handleUpload } = useFunctions();

  // States for all the input fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [file, setFile] = useState<any>(null);
  const [price, setPrice] = useState("");
  const [mainActiveIngredient, setMainActiveIngredient] = useState("");
  const [otherActiveIngredients, setOtherActiveIngredients] = useState([]);
  const [medicinalUse, setMedicinalUse] = useState([]);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  const [loadingAdd, setLoadingAdd] = useState(false);

  useEffect(() => {
    console.log("otherActiveIngredients");
    console.log(otherActiveIngredients);
  }, [otherActiveIngredients]);

  function resetFields() {
    setName("");
    setDescription("");
    setPicture("");
    setFile(null);
    setPrice("");
    setMainActiveIngredient("");
    setOtherActiveIngredients([]);
    setMedicinalUse([]);
    setAvailableQuantity(0);
  }

  async function handleAddNewMedicine() {
    // Check if all fields are filled
    console.log(name);
    console.log(file);
    console.log(picture);
    console.log(description);
    console.log(price);
    console.log(mainActiveIngredient);
    console.log(otherActiveIngredients);
    console.log(medicinalUse);
    console.log(availableQuantity);

    if (
      name === "" ||
      description === "" ||
      picture === "" ||
      price === "" ||
      file === null ||
      mainActiveIngredient === "" ||
      otherActiveIngredients.length === 0 ||
      medicinalUse.length === 0 ||
      availableQuantity === 0
    ) {
      notification.error({
        message: "Please fill all the fields!",
      });
      return;
    }

    setLoadingAdd(true);

    try {
      const data = {
        name,
        description,
        price,
        mainActiveIngredient,
        otherActiveIngredients,
        medicinalUse,
        availableQuantity,
        createdAt: new Date(),
      };

      const res = await handleUpload({
        files: file,
        endpoint: "createMedicine",
        data: data,
      });
      // const res = await fetch(
      //   `${process.env.REACT_APP_BACKEND_PHARMACY}createMedicine/`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       name,
      //       description,
      //       picture,
      //       price,
      //       mainActiveIngredient,
      //       otherActiveIngredients,
      //       medicinalUse,
      //       availableQuantity,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: userType,
      //     },
      //   }
      // );
      if (res.status === 200) {
        // setReload(!reload);
      }
      // const json = await res.json();

      setLoadingAdd(false);
      setVisible(false);
      notification.success({
        message: "Medicine added successfully!",
      });
      handleAddMedicine();
    } catch (err) {
      setLoadingAdd(false);
      notification.error({
        message: "Failed to add medicine!",
      });
    }
  }

  return (
    <Modal
      title="Add New Medicine"
      open={visible}
      onOk={() => {
        handleAddNewMedicine();
      }}
      onCancel={() => {
        resetFields();
        setVisible(false);
      }}
      okType="default"
      okText="Save"
      okButtonProps={{ loading: loadingAdd }}
      cancelText="Cancel"
    >
      {/* Input fields with all the attributes of the medicice */}
      <div className={`flex flex-col gap-y-4`}>
        {/* Name */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="name" className={`text-lg`}>
            Name
          </label>
          <Input
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* Description */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="description" className={`text-lg`}>
            Description
          </label>
          <Input
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        {/* Picture */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="picture" className={`text-lg`}>
            Picture
          </label>
          <Input
            id="picture"
            type="file"
            value={picture}
            onChange={(e) => {
              console.log(e.target.files);
              setFile(e.target.files);
              setPicture(e.target.value);
            }}
          />
        </div>
        {/* Price */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="price" className={`text-lg`}>
            Price
          </label>
          <Input
            id="price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            suffix="EGP"
          />
        </div>

        {/* Main Active Ingredient */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="mainActiveIngredient" className={`text-lg`}>
            Main Active Ingredient
          </label>
          <Input
            id="mainActiveIngredient"
            placeholder="Main Active Ingredient"
            value={mainActiveIngredient}
            onChange={(e) => {
              setMainActiveIngredient(e.target.value);
            }}
          />
        </div>
        {/* Other Active Ingredients */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="otherActiveIngredients" className={`text-lg`}>
            Other Active Ingredients
          </label>
          <Select
            mode="tags"
            open={false}
            style={{ width: "100%" }}
            placeholder="Type ingredient and press enter"
            value={otherActiveIngredients}
            onChange={
              // setOtherActiveIngredients
              (value) => {
                console.log("NEW OTHER INGREDIETN", value);
                setOtherActiveIngredients(value);
              }
            }
            options={otherActiveIngredients?.map((ingredient: any) => ({
              value: ingredient,
              label: ingredient,
            }))}
            suffixIcon={null}
          />
        </div>
        {/* Medicinal Use */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="medicinalUse" className={`text-lg`}>
            Medicinal Use
          </label>
          <Select
            mode="tags"
            open={false}
            style={{ width: "100%" }}
            placeholder="Type use and press enter"
            value={medicinalUse}
            onChange={(value) => {
              setMedicinalUse(value);
            }}
            options={medicinalUse?.map((use: any) => ({
              value: use,
              label: use,
            }))}
            suffixIcon={null}
          />
        </div>
        {/* Available Quantity */}
        <div className={`flex flex-col gap-y-1`}>
          <label htmlFor="availableQuantity" className={`text-lg`}>
            Available Quantity
          </label>
          <Input
            id="availableQuantity"
            type="number"
            placeholder="Available Quantity"
            value={availableQuantity}
            onChange={(e) => {
              setAvailableQuantity(Number(e.target.value));
            }}
          />
        </div>
        {/* Status
              <div className={`flex flex-col gap-y-1`}>
                <label htmlFor="status" className={`text-lg`}>
                  Status
                </label>
                <Input
                  id="status"
                  placeholder="Status"
                  defaultValue={medicine?.status}
                />  
              </div> */}
      </div>
    </Modal>
  );
};

export default AddNewMedicineModal;
