import styles from "screens/VirtualClinicScreens/User Screens/Admin Screens/PackagesScreen/PackagesScreen.module.css";
import { useNavigate } from "react-router";
import { FormikHelpers, useFormik } from "formik";
import { Input, notification, Spin, Table } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { listAllPackagesAction } from "redux/VirtualClinicRedux/ListAllPackages/listAllPackagesAction";
import PackageModel from "models/PackageModel";
import { updatePackageAction } from "redux/VirtualClinicRedux/UpdatePackage/updatePackageAction";
import { create } from "domain";
import { createPackageAction } from "redux/VirtualClinicRedux/CreatePackage/createPackageAction";
import { deletePackageAction } from "redux/VirtualClinicRedux/DeletePackage/deletePackageAction";
import JellyLoader from "components/JellyLoader/JellyLoader";
import * as Routes from "Routes/VirtualClinicRoutes/paths";

const PackagesScreen = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch: any = useDispatch();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showSinglePackage, setShowSinglePackage] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>();

  const hasMountedCreate = useRef(false);
  const hasMountedUpdate = useRef(false);
  const hasMountedDelete = useRef(false);

  const { packagesLoading, allPackages } = useSelector(
    (state: RootState) => state.listAllPackagesReducer
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listAllPackagesAction()); // sending the request, and update the states
    setSelectedPackage(null);
    setShowSinglePackage(false);
    console.log(allPackages);
    console.log(selectedPackage);
  }, []);

  return (
    <div
      className={`w-full flex flex-col flex-wrap items-start justify-center`}
    >
      {packagesLoading ? (
        <div className={`${styles.spinnerContainer}`}>
          <JellyLoader />
        </div>
      ) : (
        <div>
          <h1 className="pageHeading">Health Packages</h1>
          <div className="flex items-center">
              <button
                className={`${styles.editLink} `}
                onClick={() => {
                  navigate(Routes.MY_PACKAGE_PATH, {
                  });
                }}
              >
                My Packages 
              </button>
              <button
                className={`${styles.editLink}`}
                onClick={() => {
                  navigate(Routes.MY_FAMILY_PACKAGES_PATH, {
                  });
                  console.log("Clicked on My Family Packages");
                }}
              >
                My Family Packages
              </button>
            </div>
          <div className="w-full flex flex-wrap justify-start items-center">
            {Array.isArray(allPackages) &&
              allPackages?.map((packageItem: any) => (
                <div
                  key={packageItem._id}
                  className={`${styles.packageItem} ${selectedPackage?.type} ${
                    packageItem.type
                  } ${
                    selectedPackage?.type === packageItem.type &&
                    styles.currentPackage
                  } mt-5 mr-5`}
                >
                  <div className="w-full flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <h1 className="mr-2">{packageItem.type}</h1>
                      <p>| {packageItem.tier}</p>
                    </div>
                    <p className={`${styles.editLink}`}>subscribe</p>
                  </div>
                  <p>EGP {packageItem.price_per_year}</p>
                  <p>
                    Session Discount:{" "}
                    {packageItem.doctor_session_discount * 100}%
                  </p>
                  <p>
                    Medicine Discount: {packageItem.medicine_discount * 100}%
                  </p>
                  <p>Family Discount: {packageItem.family_discount * 100}%</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesScreen;