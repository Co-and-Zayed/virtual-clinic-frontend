import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Admin Screens/PackagesScreen/PackagesScreen.module.css";
import { useNavigate } from "react-router";
import { FormikHelpers, useFormik } from "formik";
import { Input, notification, Spin, Table } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { listAllPackagesAction } from "VirtualClinic/redux/VirtualClinicRedux/ListAllPackages/listAllPackagesAction";
import PackageModel from "VirtualClinic/models/PackageModel";
import { updatePackageAction } from "VirtualClinic/redux/VirtualClinicRedux/UpdatePackage/updatePackageAction";
import { create } from "domain";
import { createPackageAction } from "VirtualClinic/redux/VirtualClinicRedux/CreatePackage/createPackageAction";
import { deletePackageAction } from "VirtualClinic/redux/VirtualClinicRedux/DeletePackage/deletePackageAction";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import axios from "axios";
import { viewPackagesAction } from "VirtualClinic/redux/VirtualClinicRedux/viewPackages/viewPackagesAction";
import { unsubscribeFromPackageAction } from "VirtualClinic/redux/VirtualClinicRedux/UnsubscribeFromPackage/unsubscribeFromPackageAction";
import * as Routes from "VirtualClinic/Routes/VirtualClinicRoutes/paths";
import PaymentMethod from "../DoctorsScreen/PaymentScreens/PaymentMethod";
import HealthPackageCard from "VirtualClinic/components/HealthPackageCard/HealthPackageCard";

const ViewPackageScreen = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch: any = useDispatch();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showSinglePackage, setShowSinglePackage] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>();
  const [page, setPage] = useState<string>("packages");
  const [chosenPackage, setChosenPackage] = useState<any>();

  const navigate = useNavigate();
  const hasMountedCreate = useRef(false);
  const hasMountedUpdate = useRef(false);
  const hasMountedDelete = useRef(false);

  const { viewPackagesLoading, userviewPackages } = useSelector(
    (state: RootState) => state.viewPackagesReducer
  );

  const { unsubsribeFromPackageLoading, userUnsubsribeFromPackage } =
    useSelector((state: RootState) => state.unsubscribeFromPackageReducer);

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  const unsubscribe = async () => {
    dispatch(unsubscribeFromPackageAction({ patientID: userData?._id }));
    window.location.reload(); // Refresh the page after successful unsubscribe
  };

  useEffect(() => {
    dispatch(viewPackagesAction({ patientID: userData?._id })); // sending the request, and update the states
    setSelectedPackage(null);
    setShowSinglePackage(false);
    console.log(userviewPackages);
    console.log(selectedPackage);
  }, []);
  return (
    <div
      className={`w-full flex flex-col flex-wrap items-start justify-center`}
    >
      {viewPackagesLoading ? (
        <div className={`${styles.spinnerContainer}`}>
          <JellyLoader />
        </div>
      ) : (
        <div>
          <h1 className="pageHeading">Health Packages</h1>
          <div className="flex items-center">
            <button className={`${styles.editLink} `}>My Packages</button>
            <button
              className={`${styles.editLink}`}
              onClick={() => {
                navigate(Routes.MY_FAMILY_PACKAGES_PATH, {});
                console.log("Clicked on My Family Packages");
              }}
            >
              My Family Packages
            </button>
          </div>
          {page === "packages" ? (
            <div className="w-full flex flex-wrap justify-start items-center">
              {Array.isArray(userviewPackages) &&
                userviewPackages?.map((packageItem: any) => (
                  // <div
                  //   key={packageItem._id}
                  //   className={`${styles.packageItem} ${
                  //     selectedPackage?.type
                  //   } ${packageItem.type} ${
                  //     selectedPackage?.type === packageItem.type &&
                  //     styles.currentPackage
                  //   } mt-5 mr-5`}
                  // >
                  //   <div className="w-full flex justify-between items-center mb-2">
                  //     <div className="flex items-center">
                  //       <h1 className="mr-2">{packageItem.type}</h1>
                  //       <p>| {packageItem.tier}</p>
                  //     </div>
                  //     {packageItem.status === "SUBSCRIBED" ? (
                  //       // Render UNSUBSCRIBE button if status exists
                  //       <button
                  //         className={`${styles.editLink}`}
                  //         onClick={unsubscribe}
                  //       >
                  //         UNSUBSCRIBE
                  //       </button>
                  //     ) : (
                  //       // Render SUBSCRIBE button if status doesn't exist
                  //       <button
                  //         className={`${styles.editLink}`}
                  //         onClick={() => {
                  //           setChosenPackage(packageItem);
                  //           setPage("payment");
                  //         }}
                  //       >
                  //         SUBSCRIBE
                  //       </button>
                  //     )}
                  //   </div>
                  //   <p>EGP {packageItem.price_per_year}</p>
                  //   <p>
                  //     Session Discount:{" "}
                  //     {packageItem.doctor_session_discount * 100}%
                  //   </p>
                  //   <p>
                  //     Medicine Discount: {packageItem.medicine_discount * 100}%
                  //   </p>
                  //   <p>Family Discount: {packageItem.family_discount * 100}%</p>
                  //   {packageItem.status && (
                  //     // Render Status if it exists
                  //     <p>Status: {packageItem.status}</p>
                  //   )}
                  //   {packageItem.status === "CANCELLED" && (
                  //     // Render END DATE if status is "CANCELLED"
                  //     <p>
                  //       End Date:{" "}
                  //       {new Date(
                  //         packageItem.healthPackageRenewalDate
                  //       ).toLocaleDateString()}
                  //     </p>
                  //   )}
                  //   {packageItem.status === "UNSUBSCRIBED" && (
                  //     // Render VALID UNTIL if status is "UNSUBSCRIBED"
                  //     <p>
                  //       Valid Until:{" "}
                  //       {new Date(
                  //         packageItem.healthPackageRenewalDate
                  //       ).toLocaleDateString()}
                  //     </p>
                  //   )}
                  //   {packageItem.status === "SUBSCRIBED" && (
                  //     // Render RENEWAL DATE if status is "SUBSCRIBED"
                  //     <p>
                  //       Renewal Date:{" "}
                  //       {new Date(
                  //         packageItem.healthPackageRenewalDate
                  //       ).toLocaleDateString()}
                  //     </p>
                  //   )}
                  //   {packageItem.discountedPrice && (
                  //     // Render Status if it exists
                  //     <p>Discounted Price: {packageItem.discountedPrice}</p>
                  //   )}
                  // </div>
                  <HealthPackageCard
                    packageItem={packageItem}
                    subscribeCallback={() => {
                      setChosenPackage(packageItem);
                      setPage("payment");
                    }}
                    unsubscribeCallback={unsubscribe}
                  />
                ))}
            </div>
          ) : (
            <PaymentMethod
              priceOriginal={chosenPackage?.price_per_year}
              priceDiscounted={
                chosenPackage?.discountedPrice ?? chosenPackage?.price_per_year
              }
              backBtnOnClick={() => {
                setPage("packages");
                window.location.reload(); // Refresh the page after successful unsubscribe
              }}
              transactionDescription=" subscribe to Package"
              callBackOnSuccess={async () => {
                var response = await fetch(
                  `${process.env.REACT_APP_BACKEND_CLINIC}patient/subscribeToPackage`,
                  {
                    method: "POST",
                    body: JSON.stringify({
                      packageID: chosenPackage?._id,
                      patientID: userData?._id,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );
                console.log(response);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ViewPackageScreen;
