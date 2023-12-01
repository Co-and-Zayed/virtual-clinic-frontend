import styles from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/MedicineScreen.module.css";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  Avatar,
  Badge,
  Button,
  Input,
  Modal,
  Popover,
  Select,
  Tooltip,
} from "antd";
import type {
  ColumnType,
  ColumnsType,
  FilterValue,
  SorterResult,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { all } from "axios";
import { listAllMedicinesAction } from "Pharmacy/redux/PharmacyRedux/ListAllMedicines/listAllMedicinesAction";
import { set } from "mongoose";
import { allMedicinalUsesAction } from "Pharmacy/redux/PharmacyRedux/Dropdowns/AllMedicinalUses/allMedicinalUsesAction";
import { Link, useSearchParams } from "react-router-dom";
import AddNewMedicineModal from "./AddNewMedicineModal";
import CustomModal from "Pharmacy/components/Modal/Modal";
import PatientMedicineInfoScreen from "Pharmacy/screens/User Screens/Patient Screens/MedicineInfoScreen/MedicineInfoScreen";
import PharmacistInfoMedicineScreen from "Pharmacy/screens/User Screens/Pharmacist Screens/MedicineInfoScreen/MedicineInfoScreen";
import { URLSearchParams } from "url";
import { Console } from "console";
import { useFunctions } from "hooks/useFunctions";
import { access } from "fs";
import { CartIcon } from "Pharmacy/assets/IconComponents";
import Counter from "Pharmacy/components/Counter/Counter";
import CartItem from "Pharmacy/components/CartItem/CartItem";
import AnimatedDigitsLarge from "Pharmacy/components/AnimatedDigitsLarge/AnimatedDigitsLarge";
import AnimatedDigits from "Pharmacy/components/AnimatedDigits/AnimatedDigits";
import RoundedButton from "Pharmacy/components/RoundedButton/RoundedButton";
import RightArrowIcon from "Pharmacy/assets/IconComponents/RightArrowIcon";
import { GET_CART } from "Pharmacy/redux/PharmacyRedux/types";
import { useNav } from "Pharmacy/hooks/useNav";

interface DataType {
  patientEmail: string;
  pharmacistEmail: string;
  date: string;
  time: string;
  status: string;
  key: string;
}
type DataIndex = keyof DataType;

const MedicineScreen = () => {
  const { accessToken } = useSelector((state: RootState) => state.userReducer);
  const { shouldGetCart } = useSelector(
    (state: RootState) => state.patientCartReducer
  );

  const navigate = useNav();
  const { toDecimalPlaces } = useFunctions();

  const [searchParams, setSearchParams] = useSearchParams();

  const [refresh, setRefresh] = useState(false);

  const [medicineId, setMedicineId] = useState<any>();
  const [searchText, setSearchText] = useState("");
  const [dropdownText, setDropdownText] = useState<any>([]);
  const [currAllMedicines, setCurrAllMedicines] = useState<any>([]);

  const [openAddMedicineModal, setOpenAddMedicineModal] = useState(false);

  const [viewMedicineModal, setViewMedicineModal] = useState(false);

  const [hasAdded, setHasAdded] = useState<boolean>(false);
  const [myCart, setMyCart] = useState<any>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [initialQuantity, setInitialQuantity] = useState<number>(1);

  const [hasMounted, setHasMounted] = useState(false);
  const [changingCart, setChangingCart] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const addToCart = (newItem: {
    quantity: number;
    medicine: string;
    fromCounter?: boolean;
  }) => {
    // Check if the newItem is already in the cart.
    setChangingCart(true);
    const existingItemIndex = myCart.findIndex(
      (item: any) => item.medicine._id === newItem.medicine
    );

    if (existingItemIndex !== -1) {
      // If it exists, update its quantity.

      const updatedCart = [...myCart];
      updatedCart[existingItemIndex].quantity = newItem.quantity;
      if (!newItem.fromCounter) {
        const removedItem = updatedCart[existingItemIndex];
        updatedCart.splice(existingItemIndex, 1);
        setMyCart([...updatedCart, removedItem]);
      } else {
        setMyCart([...updatedCart]);
      }
    } else {
      // If it doesn't exist, add it to the cart.
      setMyCart([...myCart, newItem]);
    }
  };

  const updateCart = async (newCart: any) => {
    // setHasAdded(false);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_PHARMACY}patient/updateCart`,
        {
          method: "PUT",
          body: JSON.stringify({ cart: newCart }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setHasAdded(true);
      const json = await res.json();
    } catch (err) {}
  };

  const getCart = async () => {
    // setHasAdded(false);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_PHARMACY}patient/getCart`,
        {
          method: "GET",
          // body: JSON.stringify(myCart),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // setHasAdded(true);
      const json = await res.json();
      const { cart } = json;
      setMyCart(cart);
    } catch (err) {}
    setHasMounted(true);
    //
  };

  useEffect(() => {
    if (shouldGetCart) {
      getCart();
      dispatch({ type: GET_CART, payload: false });
    }
  }, [shouldGetCart]);

  const updateTotalQuantity = () => {
    let total = 0;
    let totalPrice = 0;
    myCart?.forEach((item: any) => {
      total += item.quantity;
      totalPrice += item.quantity * item.price;
    });
    setTotalQuantity(total);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    if (userType === "PATIENT") {
      getCart();
    }
    // hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (hasMounted && changingCart) {
      updateCart(myCart);
      setChangingCart(false);
    }
    updateTotalQuantity();
  }, [myCart]);

  const { userData, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { medicinesLoading, allMedicines } = useSelector(
    (state: RootState) => state.listAllMedicinesReducer
  );

  const { medicinalUsesLoading, allMedicinalUses } = useSelector(
    (state: RootState) => state.allMedicinalUsesReducer
  );

  function isSubset(subsetArray: any, mainArray: any) {
    return subsetArray.every((item: any) => mainArray.includes(item));
  }

  const handleSearchClick = () => {
    const filteredMedicines = allMedicines.filter((medicine: any) =>
      medicine.name.toLowerCase().includes(searchText?.toLowerCase())
    );

    if (dropdownText !== "") {
      const filteredMedicinesWithDropdown = filteredMedicines.filter(
        (medicine: any) => isSubset(dropdownText, medicine.medicinalUse)
      );
      setCurrAllMedicines(filteredMedicinesWithDropdown);
    } else setCurrAllMedicines(filteredMedicines);
  };

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(listAllMedicinesAction());
    dispatch(allMedicinalUsesAction());
  }, [refresh]);

  useEffect(() => {
    setCurrAllMedicines(allMedicines);
  }, [allMedicines]);

  useEffect(() => {
    if (searchParams.get("id")) {
      // check if id is in cart
      setShowPopover(false);
      const medicineId = searchParams.get("id");
      const existingItemIndex = myCart?.findIndex(
        (item: any) => item.medicine._id === medicineId
      );

      if (existingItemIndex !== -1) {
        // If it exists, update its quantity.

        // set quantity with this medicine's quantity in cart
        setInitialQuantity(myCart[existingItemIndex].quantity);
        setHasAdded(true);
      } else {
        // If it doesn't exist, add it to the cart.

        setInitialQuantity(-1);
        setHasAdded(false);
      }
      setViewMedicineModal(true);
    }
  }, [searchParams, myCart]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <div className="w-full flex items-center justify-between pr-16">
        <h1 className="pageHeading">Medicine</h1>
        {userType === "PATIENT" && (
          <Popover
            color="white"
            trigger={"click"}
            placement="topRight"
            open={showPopover}
            title={
              <div
                className="w-[22.5rem] "
                style={{
                  color: "var(--dark-green)",
                  fontFamily: "Cabin",
                }}
              >
                <div
                  className="w-full flex items-center justify-start"
                  style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}
                >
                  <p>My Cart</p>
                  <div
                    className="flex items-center justify-center ml-2"
                    style={{ color: "var(--faded-green)" }}
                  >
                    |
                    <AnimatedDigits
                      count={totalQuantity}
                      style={{
                        fontSize: "1.25rem",
                        color: "var(--faded-green)",
                        fontFamily: "Cabin",
                        fontWeight: 500,
                      }}
                    />
                  </div>
                </div>

                <div className="w-full-flex-col">
                  <div className={`${styles.cartItemContainer}`}>
                    <div className="flex flex-col items-center justify-center gap-7">
                      {/* reverse my cart */}

                      {myCart
                        ?.slice()
                        .reverse()
                        .map((item: any) => {
                          return (
                            <CartItem
                              id={item.medicine._id}
                              picture={item.picture}
                              name={item.name}
                              price={item.price}
                              quantity={item.quantity}
                              setQuantity={(newQuantity: number) => {
                                addToCart({
                                  medicine: item.medicine._id,
                                  quantity: newQuantity,
                                  fromCounter: true,
                                });
                              }}
                              deleteItem={() => {
                                const newCart = myCart.filter(
                                  (cartItem: any) =>
                                    cartItem.medicine !== item.medicine
                                );
                                setChangingCart(true);
                                setMyCart(newCart);
                              }}
                              maxAmount={item.availableQuantity}
                            />
                          );
                        })}
                    </div>
                  </div>
                  <div className={`${styles.divider}`}></div>
                  <div className="w-full flex justify-between items-end mt-5 mb-5">
                    <p
                      style={{
                        letterSpacing: "0.35rem",
                        lineHeight: "initial",
                        fontSize: "0.8rem",
                        fontWeight: 100,
                      }}
                    >
                      TOTAL
                    </p>
                    <div className="flex h-full pr-3 items-center justify-end">
                      <AnimatedDigitsLarge count={totalPrice} size={18} />
                      <div
                        className="ml-2"
                        style={{
                          letterSpacing: "0.15rem",
                          lineHeight: "initial",
                          fontSize: "0.8rem",
                          fontWeight: 100,
                        }}
                      >
                        EGP
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center align-center">
                    <RoundedButton
                      text="Checkout"
                      icon={
                        <RightArrowIcon
                          fontSize={18}
                          style={{ rotate: "-45deg" }}
                        />
                      }
                      onClick={() =>
                        navigate("/buy-medicine", {
                          state: {
                            cart: myCart,
                            totalPrice: totalPrice,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            }
          >
            <div
              onClick={async () => {
                setShowPopover((prev) => !prev);
                await getCart();
              }}
            >
              <Badge
                count={totalQuantity}
                className="cursor-pointer"
                style={{ boxShadow: "0 0 0 2px var(--bg-main)" }}
              >
                <CartIcon fontSize={"1.75rem"} />
              </Badge>
            </div>
          </Popover>
        )}
      </div>
      {/* <Table dataSource={data} columns={columns} /> */}
      <div className="w-full flex items-center mb-6">
        <Input
          className="w-[15rem] mr-3"
          size="large"
          type="text"
          name="search"
          onKeyPress={handleKeyPress}
          placeholder="Search for medicine by name"
          onChange={(event: any) => {
            setSearchText(event?.target?.value);
          }}
        />
        {/* create a dropdown using select from antd */}
        <Select
          mode="multiple"
          allowClear
          className="w-[25rem] mr-3"
          size="large"
          placeholder="Medicinal Use"
          options={allMedicinalUses.map((medicinalUse: any) => ({
            value: medicinalUse,
            label: medicinalUse,
          }))}
          // defaultValue="name"
          onChange={(value: any) => {
            setDropdownText(value);
          }}
        />
        <div className={`${styles.searchButton}`} onClick={handleSearchClick}>
          <SearchOutlined />
        </div>

        {/* Add New Medicine Button if Pharmacist */}
        {userType === "PHARMACIST" && (
          <div
            className={`${styles.addButton}`}
            onClick={() => {
              setOpenAddMedicineModal(true);
            }}
            style={{ marginLeft: "auto" }}
          >
            Add New Medicine
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-6">
        {currAllMedicines?.map((medicine: any) => (
          <div
            className={`flex flex-col ${styles.mainContainer}`}
            onClick={() => {
              // navigate(`/medicine/${medicine._id}`);
              navigate("/medicine?id=" + medicine._id);
              // setViewMedicineModal(true);
            }}
          >
            <div
              className={`flex items-center justify-center ${styles.imageContainer}`}
            >
              <div
                className={`${styles.image}`}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: medicine?.picture?.includes("https")
                    ? `url('${encodeURI(medicine.picture)})`
                    : `url('${process.env.REACT_APP_BUCKET_URL}${medicine.picture}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: "blur(5px)",
                  position: "absolute",
                }}
              ></div>
              <div
                className={`${styles.image}`}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: medicine?.picture?.includes("https")
                    ? `url('${encodeURI(medicine.picture)})`
                    : `url('${process.env.REACT_APP_BUCKET_URL}${medicine.picture}')`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  position: "absolute",
                }}
              ></div>
              <p className={`${styles.viewDetails}`}>VIEW DETAILS</p>
            </div>
            <div
              className={`w-full flex flex-col justify-between ${styles.dataContainer}`}
            >
              <div className="flex flex-col">
                <div className={`flex ${styles.medicinalUse}`}>
                  {medicine.medicinalUse.map(
                    (medicinalUse: any, index: any) => (
                      <>
                        <p>{medicinalUse}</p>
                        {index < medicine.medicinalUse.length - 1 && (
                          <span> - </span>
                        )}
                      </>
                    )
                  )}
                </div>
                <h1>
                  <Highlighter
                    highlightStyle={{
                      backgroundColor: "#ffc069",
                      padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={
                      medicine.name ? medicine.name.toString() : ""
                    }
                  />
                </h1>
                {userType === "PHARMACIST" && (
                  // quantity
                  <p
                    className={`w-full flex justify-between text-teal-500 text-sm`}
                  >
                    QTY Left: {medicine.availableQuantity}
                  </p>
                )}
              </div>
              {/* <p className="threeLineEllipsis">{medicine.description}</p> */}
              {/* <p className={`w-full flex justify-between`}>
                {userType === "PHARMACIST" && <p>{medicine.totalSales} Sold</p>}
                <p>EGP {medicine.price}</p>
              </p> */}
              <div
                className={`flex items-center justify-between ${styles.priceContainer}`}
              >
                <div className="flex items-end">
                  <p>{toDecimalPlaces(medicine.price, 2)}</p>
                  <span>EGP</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {check if the user type is patient or pharmacist} */}
      {viewMedicineModal &&
        (userType === "PATIENT" ? (
          <CustomModal
            className={`w-[80%] h-[70%]`}
            setCloseState={setViewMedicineModal}
            onClose={() => {
              navigate("/medicine");
            }}
          >
            <PatientMedicineInfoScreen
              addToCart={addToCart}
              hasAdded={hasAdded}
              setHasAdded={setHasAdded}
              initialQuantity={initialQuantity}
            />
          </CustomModal>
        ) : (
          <CustomModal
            className={`w-[80%] h-[90%]`}
            setCloseState={setViewMedicineModal}
            onClose={() => {
              navigate("/medicine");
            }}
          >
            <PharmacistInfoMedicineScreen />
          </CustomModal>
        ))}

      {/* Add New Medicine Modal */}
      <AddNewMedicineModal
        visible={openAddMedicineModal}
        setVisible={setOpenAddMedicineModal}
        handleAddMedicine={() => {
          setRefresh(!refresh);
        }}
      />
    </div>
  );
};

export default MedicineScreen;
