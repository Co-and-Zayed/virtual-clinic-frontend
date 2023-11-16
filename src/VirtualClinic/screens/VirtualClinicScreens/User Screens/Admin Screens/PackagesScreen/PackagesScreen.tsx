import styles from "VirtualClinic/screens/VirtualClinicScreens/User Screens/Admin Screens/PackagesScreen/PackagesScreen.module.css";
import { useNav } from "hooks/useNav";
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

const PackagesScreen = () => {
  // const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
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

  const { creatingPackageLoading, createdPackage } = useSelector(
    (state: RootState) => state.createPackageReducer
  );
  const { updatePackageLoading, updatedPackage } = useSelector(
    (state: RootState) => state.updatePackageReducer
  );
  const { deletingPackageLoading, deletedPackage } = useSelector(
    (state: RootState) => state.deletePackageReducer
  );
  const { userType } = useSelector((state: RootState) => state.userReducer);

  const handlePackageClick = (packageItem: any) => {
    formik.setValues({
      type: packageItem.type,
      price_per_year: packageItem.price_per_year,
      doctor_session_discount: packageItem.doctor_session_discount,
      medicine_discount: packageItem.medicine_discount,
      family_discount: packageItem.family_discount,
    });
    setSelectedPackage(packageItem);
    setShowSinglePackage(true);
    setActionType("edit");
  };

  const handleAddClick = () => {
    formik.setValues({
      type: null,
      price_per_year: null,
      doctor_session_discount: null,
      medicine_discount: null,
      family_discount: null,
    });

    setSelectedPackage(null);
    setShowSinglePackage(true);
    setActionType("add");
  };

  const formik = useFormik({
    initialValues: {
      type: null,
      price_per_year: null,
      doctor_session_discount: null,
      medicine_discount: null,
      family_discount: null,
    },
    onSubmit: async (values: PackageModel, actions: any) => {
      // await dispatch(
      //   createPostAction({
      //     title: values.title,
      //   })
      // );

      console.log("SUBMITTING", values);

      if (actionType === "add") {
        await dispatch(createPackageAction(values));
      } else if (actionType === "edit") {
        console.log("SELECTED PACKAGE", selectedPackage._id);
        await dispatch(updatePackageAction(selectedPackage._id, values));
      } else if (actionType === "delete") {
        console.log("DELETING: ", selectedPackage._id);
        await dispatch(deletePackageAction(selectedPackage._id));
      }
    },
  });

  /*************************** CHECKING CREATE PACKAGE ********************/
  const checkCreatedPackage = () => {
    console.log("CREATED PACKAGE: ", createdPackage);
    var isError = false;
    if (createdPackage?.status && createdPackage?.status === 400) {
      isError = true;
      notification.error({
        message: "There's already a package with that name!",
        placement: "topRight",
      });
    }
    if (!isError) {
      console.log("MALAK???");
      dispatch(listAllPackagesAction());
      setSelectedPackage(null);
      setShowSinglePackage(false);
      notification.success({
        message: "Package Created Successfully",
        placement: "topRight",
      });
    }
    return "success";
  };

  useEffect(() => {
    if (hasMountedCreate.current) {
      const test = checkCreatedPackage();
    } else {
      hasMountedCreate.current = true;
    }
  }, [createdPackage]);

  /*************************** CHECKING UPDATE PACKAGE ********************/
  const checkUpdatedPackage = () => {
    if (updatedPackage?.status && updatedPackage?.status === 400) {
      notification.error({
        message: "Wopsie!",
        placement: "topRight",
      });
      return "fail";
    }
    dispatch(listAllPackagesAction());
    setSelectedPackage(null);
    setShowSinglePackage(false);
    notification.success({
      message: "Package Updated Successfully",
      placement: "topRight",
    });
    return "success";
  };

  useEffect(() => {
    if (hasMountedUpdate.current) {
      checkUpdatedPackage();
    } else {
      hasMountedUpdate.current = true;
    }
  }, [updatedPackage]);

  /*************************** CHECKING CREATE PACKAGE ********************/
  const checkDeletedPackage = () => {
    if (deletedPackage?.status && deletedPackage?.status === 400) {
      notification.error({
        message: "Wops!",
        placement: "topRight",
      });
      return;
    }
    dispatch(listAllPackagesAction());
    setSelectedPackage(null);
    setShowSinglePackage(false);
    notification.success({
      message: "Package Deleted Successfully",
      placement: "topRight",
    });
    return "success";
  };

  useEffect(() => {
    if (hasMountedDelete.current) {
      checkDeletedPackage();
    } else {
      hasMountedDelete.current = true;
    }
  }, [deletedPackage]);

  const generateFieldRow = (fields: any) => {
    return (
      <div className="w-full flex justify-center items-start gap-x-3">
        {fields.map((field: any) => (
          <div className="w-full flex flex-col justify-center items-start mb-5">
            <h1 className="mb-2">{field.title}</h1>
            <Input
              size="large"
              placeholder={field.title}
              name={field.name}
              value={field.value}
              status={field.status}
              onChange={formik.handleChange}
            />
            {field.error && <p className="text-red-500">{field.error}</p>}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    dispatch(listAllPackagesAction()); // sending the request, and update the states
    setSelectedPackage(null);
    setShowSinglePackage(false);
    console.log(allPackages);
    console.log(userType);
    console.log("YBNY ER7AMNY");
    console.log(selectedPackage);
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="pb-24">
      <div
        className={`w-full flex flex-col flex-wrap items-start justify-center`}
      >
        {packagesLoading ? (
          <div className={`${styles.spinnerContainer}`}>
            <JellyLoader />
          </div>
        ) : (
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
                  onClick={() => handlePackageClick(packageItem)}
                >
                  <div className="w-full flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <h1 className="mr-2">{packageItem.type}</h1>
                      <p>| {packageItem.tier}</p>
                    </div>
                    <p className={`${styles.editLink}`}>Edit</p>
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
            <div className={`${styles.plusIcon}`} onClick={handleAddClick}>
              <PlusOutlined />
            </div>
          </div>
        )}
        {showSinglePackage && (
          <div className="w-[40rem]  flex flex-col justify-center items-start mt-12">
            {generateFieldRow([
              {
                title: "Package Name",
                name: "type",
                value: formik.values.type,
                status: formik.errors.type ? "error" : "",
                error: formik.errors.type,
              },
              {
                title: "Price",
                name: "price_per_year",
                value: formik.values.price_per_year,
                status: formik.errors.price_per_year ? "error" : "",
                error: formik.errors.price_per_year,
              },
            ])}
            {generateFieldRow([
              {
                title: "Session Discount",
                name: "doctor_session_discount",
                value: formik.values.doctor_session_discount,
                status: formik.errors.doctor_session_discount ? "error" : "",
                error: formik.errors.doctor_session_discount,
              },
              {
                title: "Medicine Discount",
                name: "medicine_discount",
                value: formik.values.medicine_discount,
                status: formik.errors.medicine_discount ? "error" : "",
                error: formik.errors.medicine_discount,
              },
            ])}
            {generateFieldRow([
              {
                title: "Family Discount",
                name: "family_discount",
                value: formik.values.family_discount,
                status: formik.errors.family_discount ? "error" : "",
                error: formik.errors.family_discount,
              },
            ])}
            <div className="w-full flex justify-end gap-x-2">
              <button
                className="bg-[blue]"
                style={{ alignSelf: "center" }}
                type="submit"
              >
                Submit
              </button>
              <button
                className={`${styles.deleteButton}`}
                style={{ alignSelf: "center" }}
                onClick={() => {
                  setActionType("delete");
                }}
                type="submit"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default PackagesScreen;
