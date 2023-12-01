import styles from "./MedicineInfoScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import {
  EditOutlined,
  InfoCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  Button,
  Input,
  Space,
  Table,
  Modal,
  List,
  Select,
  Spin,
  notification,
  Popover,
} from "antd";
import type {
  ColumnType,
  ColumnsType,
  FilterValue,
  SorterResult,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { useFunctions } from "hooks/useFunctions";
import ShowWithAnimation from "Pharmacy/components/ShowWithAnimation";
import JellyLoader from "Pharmacy/components/JellyLoader/JellyLoader";
import Counter from "Pharmacy/components/Counter/Counter";
import AnimatedDigits from "Pharmacy/components/AnimatedDigits/AnimatedDigits";
import AnimatedDigitsLarge from "Pharmacy/components/AnimatedDigitsLarge/AnimatedDigitsLarge";

//////////////////////////////////// START OF CODE
interface DataType {
  patientEmail: string;
  pharmacistEmail: string;
  date: string;
  time: string;
  status: string;
  key: string;
}

type DataIndex = keyof DataType;

// interface MedicineInfoScreenProps {
//   id: any;
// }
interface MedicineInfoScreenProps {
  addToCart: any;
  hasAdded: boolean;
  setHasAdded: any;
  initialQuantity: number;
}

const MedicineInfoScreen: FC<MedicineInfoScreenProps> = ({
  addToCart,
  hasAdded,
  setHasAdded,
  initialQuantity,
}) => {
  // const { addingFamMemLoading, confirm } = useSelector(
  //   (state: RootState) => state.createAppointmentReducer
  // );
  // const { id } = useParams();
  const { toDecimalPlaces } = useFunctions();

  const [searchParams, setSearchParams] = useSearchParams();

  const [medicine, setMedicine] = useState<any>({});

  const [openEditModal, setOpenEditModal] = useState(false);

  const [reload, setReload] = useState(false);

  const [quantity, setQuantity] = useState(
    initialQuantity < 0 ? 1 : initialQuantity
  );

  // States for all the input fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [price, setPrice] = useState("");
  const [mainActiveIngredient, setMainActiveIngredient] = useState("");
  const [otherActiveIngredients, setOtherActiveIngredients] = useState([]);
  const [medicinalUse, setMedicinalUse] = useState([]);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [showMedicine, setShowMedicine] = useState<boolean>(false);

  useEffect(() => {}, []);

  // fetch medicine from api using
  useEffect(() => {
    const fetchData = async () => {
      setShowMedicine(false);
      try {
        const res = await fetch(
          `${
            process.env.REACT_APP_BACKEND_PHARMACY
          }getMedicineById/${searchParams.get("id")}`,
          {
            method: "GET",
            headers: { Authorization: userType },
          }
        );
        const json = await res.json();

        setMedicine(json);
        setName(json.name);
        setDescription(json.description);
        setPicture(json.picture);
        setPrice(json.price);
        setMainActiveIngredient(json.mainActiveIngredient);
        setOtherActiveIngredients(json.otherActiveIngredients);
        setMedicinalUse(json.medicinalUse);
        setAvailableQuantity(json.availableQuantity);
      } catch (err) {}
      setShowMedicine(true);
    };

    fetchData();
  }, [searchParams.get("id"), reload]);

  const dispatch: any = useDispatch();

  const { userData, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  // useEffect(() => {
  //   return setShowMedicine(false);
  // }, []);

  useEffect(() => {
    if (!openEditModal) {
      resetFields();
    }
  }, [openEditModal]);

  useEffect(() => {
    if (quantity === initialQuantity) {
      setHasAdded(true);
    } else {
      setHasAdded(false);
    }
  }, [quantity]);

  function resetFields() {
    setName(medicine?.name);
    setDescription(medicine?.description);
    setPicture(medicine?.picture);
    setPrice(medicine?.price);
    setMainActiveIngredient(medicine?.mainActiveIngredient);
    setOtherActiveIngredients(medicine?.otherActiveIngredients);
    setMedicinalUse(medicine?.medicinalUse);
    setAvailableQuantity(medicine?.availableQuantity);
  }

  async function handleEditMedicine() {
    setLoadingEdit(true);

    try {
      const res = await fetch(
        `${
          process.env.REACT_APP_BACKEND_PHARMACY
        }editMedicine/${searchParams.get("id")}`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            description,
            picture,
            price,
            mainActiveIngredient,
            otherActiveIngredients,
            medicinalUse,
            availableQuantity,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: userType,
          },
        }
      );
      if (res.status === 200) {
        setReload(!reload);
      }
      const json = await res.json();

      setLoadingEdit(false);
      setOpenEditModal(false);
      notification.success({
        message: "Medicine edited successfully!",
      });
    } catch (err) {
      setLoadingEdit(false);
      notification.error({
        message: "Failed to edit medicine!",
      });
    }
  }

  return (
    <ShowWithAnimation isMounted={showMedicine}>
      <div
        className={`w-full h-full flex flex-col items-start justify-center mb-16`}
      >
        {/* Display medicine info */}
        <div
          className={`w-full h-full flex flex-col items-start justify-center`}
        >
          {/* PICTURE AND INFO */}
          <div className="w-full h-full flex gap-x-12">
            {/* PICTURE */}
            <div
              className="w-[28rem] mr-10 flex items-center justify-center"
              style={{
                backgroundImage: medicine?.picture?.includes("https")
                  ? `url('${encodeURI(medicine.picture)})`
                  : `url('${process.env.REACT_APP_BUCKET_URL}${medicine.picture}')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
              {/* <img
              className={`w-96 h-96 rounded-2xl`}
              src={medicine.picture}
              alt="medicine picture"
            /> */}
            </div>

            <div className="flex flex-col pt-[2rem] pb-[8rem] w-1/2 h-full justify-between">
              {/* INFO */}
              <div className="w-full flex flex-col gap-y-10">
                {/* Name */}
                <div className="w-full flex justify-between">
                  <div className="w-full flex flex-col">
                    <div
                      className={`font-bold`}
                      style={{ fontSize: "3rem", lineHeight: "1.25" }}
                    >
                      {medicine?.name}
                    </div>
                    <div className="w-full flex justify-between">
                      <div
                        className={`flex items-baseline gap-x-1 text-xl`}
                        // style={{ fontWeight: "100" }}
                      >
                        <p>{toDecimalPlaces(medicine?.price, 2)}</p>{" "}
                        <p style={{ lineHeight: "initial" }}>EGP</p>
                      </div>

                      <div
                        style={{
                          color: `${
                            medicine?.availableQuantity < 10 ? "red" : ""
                          }`,
                        }}
                      >
                        {medicine?.availableQuantity >= 10
                          ? "In "
                          : `${medicine?.availableQuantity} left in`}{" "}
                        stock
                      </div>
                    </div>
                  </div>

                  {
                    // edit button
                    userType === "PHARMACIST" && (
                      <Button
                        // type="primary"
                        className={`text-lg w-30 h-10 rounded-md`}
                        icon={<EditOutlined />}
                        onClick={() => {
                          setOpenEditModal(true);
                        }}
                      >
                        Edit
                      </Button>
                    )
                  }
                </div>
                {/* Medicinal Uses */}
                <div>
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col">
                      <p className={`${styles.subItemHeading}`}>
                        Medicinal Use
                      </p>
                      <div className={`flex gap-2 flex-wrap my-0`}>
                        {medicine?.medicinalUse?.map(
                          (medicinalUse: any, index: any) => {
                            if (index < 3) {
                              return (
                                <div className={`${styles.subItem}`}>
                                  {medicinalUse}
                                </div>
                              );
                            }
                          }
                        )}
                        {medicinalUse?.length > 3 && (
                          <Popover
                            placement="bottomRight"
                            title={
                              <div className={`${styles.otherIngredients}`}>
                                {medicine?.medicinalUse?.map(
                                  (medicinalUse: any, index: any) => {
                                    if (index >= 3) {
                                      return <p>{medicinalUse}</p>;
                                    }
                                  }
                                )}
                              </div>
                            }
                          >
                            <div
                              className={`${styles.subItem} ${styles.otherButton}`}
                            >
                              ...
                            </div>
                          </Popover>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-x-2">
                      <div className="flex flex-col justify-end">
                        <p className={`${styles.subItemHeading} `}>
                          Main Ingredient
                        </p>
                        <div className={`${styles.subItem}`}>
                          {medicine?.mainActiveIngredient}
                        </div>
                      </div>
                      <div className="flex flex-col justify-end">
                        <p className={`${styles.subItemHeading} `}>Other</p>
                        <Popover
                          placement="bottomRight"
                          title={
                            <div className={`${styles.otherIngredients}`}>
                              {medicine?.otherActiveIngredients?.map(
                                (ingredient: any) => (
                                  <p>{ingredient}</p>
                                )
                              )}
                            </div>
                          }
                        >
                          <div
                            className={`${styles.subItem} ${styles.otherButton}`}
                          >
                            ...
                          </div>
                        </Popover>
                      </div>
                    </div>
                  </div>
                  <div className={`w-full h-[1px] bg-gray-300 my-3`}></div>
                  <div className="h-[8rem]">{medicine?.description}</div>
                </div>

                {/* AVAILABLE QUANTITY (if pharmacist) */}
                {userType === "PHARMACIST" && (
                  <div className={`flex flex-col gap-y-2 text-base`}>
                    Available Quantity
                    <div className="flex">
                      <div className={`text-xl font-bold`}>
                        {medicine?.availableQuantity}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Counter
                maxAmount={medicine?.availableQuantity}
                quantity={quantity}
                setQuantity={setQuantity}
                width={6}
              />
              {/* <AnimatedDigitsLarge count={quantity * medicine?.price} size={20} /> */}
              <div
                className={`${
                  !hasAdded
                    ? styles.addCartButton
                    : styles.addCartButtonSelected
                } w-[15rem] h-[3rem] flex items-center justify-center`}
                onClick={() => {
                  if (!hasAdded) {
                    addToCart({
                      quantity: quantity,
                      medicine: searchParams.get("id"),
                    });
                  }
                }}
              >
                {!hasAdded ? "Add to cart" : "Added"}
                {hasAdded && <CheckOutlined className="ml-2" />}
              </div>
            </div>
          </div>

          {userType === "PHARMACIST" && (
            // SALES HISTORY
            <div className="w-full flex flex-col gap-y-4 mt-16">
              <p className="text-xl">Sales History</p>
              <Table
                columns={
                  [
                    {
                      title: "Patient",
                      dataIndex: "patientUsername",
                      key: "patientUsername",
                      sorter: (a, b) =>
                        a.patientUsername.localeCompare(b.patientUsername),
                      sortDirections: ["descend", "ascend"],
                    },
                    {
                      title: "Date",
                      dataIndex: "date",
                      key: "date",
                      sorter: (a, b) => a.date.localeCompare(b.date),
                      sortDirections: ["descend", "ascend"],
                      // display date in a readable format
                      render: (date) => {
                        const dateObj = new Date(date);
                        const dateStr = dateObj.toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        });
                        return dateStr;
                      },
                    },
                    {
                      title: "Time",
                      dataIndex: "time",
                      key: "time",
                      sorter: (a, b) => a.time.localeCompare(b.time),
                      sortDirections: ["descend", "ascend"],
                    },
                    {
                      title: "Quantity",
                      dataIndex: "quantity",
                      key: "quantity",
                      width: "20%",
                      sorter: (a, b) => a.quantity - b.quantity,
                      sortDirections: ["descend", "ascend"],
                    },
                  ] as ColumnsType<any>
                }
                dataSource={medicine?.sales?.map((sale: any) => {
                  // derive time from date
                  const date = new Date(sale.date);
                  const time = date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  sale.time = time;
                  return sale;
                })}
                pagination={false}
                bordered
                summary={(pageData) => {
                  let totalBorrow = 0;
                  let totalRepayment = 0;

                  pageData.forEach(({ borrow, repayment }) => {
                    totalBorrow += borrow;
                    totalRepayment += repayment;
                  });

                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell
                          className="font-bold"
                          index={2}
                          colSpan={3}
                        >
                          Total Sales
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                          <p className="text-blue-500 font-bold">
                            {medicine?.totalSales}
                          </p>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </div>
          )}
        </div>

        {/* EDIT MODAL */}
        {
          // edit modal
          userType === "PHARMACIST" && (
            <Modal
              title="Edit Medicine"
              open={openEditModal}
              onOk={() => {
                handleEditMedicine();
              }}
              onCancel={() => {
                resetFields();
                setOpenEditModal(false);
              }}
              okButtonProps={{
                loading: loadingEdit,
              }}
              okType="default"
              okText="Save"
              cancelText="Cancel"
              // footer={[
              //   <Button
              //     key="back"
              //     onClick={() => {
              //       setOpenEditModal(false);
              //     }}
              //   >
              //     Cancel
              //   </Button>,
              //   <Button
              //     key="submit"
              //     type="default"
              //     loading={false}
              //     onClick={() => {
              //       setOpenEditModal(false);
              //     }}
              //   >
              //
              //   </Button>,
              // ]}
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
                    defaultValue={medicine?.name}
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
                    defaultValue={medicine?.description}
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
                    placeholder="Picture"
                    defaultValue={medicine?.picture}
                    value={picture}
                    onChange={(e) => {
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
                    defaultValue={medicine?.price}
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
                    defaultValue={medicine?.mainActiveIngredient}
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
                    placeholder="Select or add ingredients"
                    value={otherActiveIngredients}
                    onChange={
                      // setOtherActiveIngredients
                      (value) => {
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
                    placeholder="Edit medicinal uses"
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
                    defaultValue={medicine?.availableQuantity}
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
          )
        }
      </div>
    </ShowWithAnimation>
  );
};

export default MedicineInfoScreen;
