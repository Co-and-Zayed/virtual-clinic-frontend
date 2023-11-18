import styles from "Pharmacy/screens/User Screens/Admin Screens/AdminsScreen/AdminsScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Pharmacy/redux/rootReducer";
import { listAllAdminsAction } from "Pharmacy/redux/PharmacyRedux/ListAllAdmins/listAllAdminsAction";
import { FormikHelpers, useFormik } from "formik";
import { Input, notification, Spin, Table } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AdminModel from "Pharmacy/models/AdminModel";
import { createAdminAction } from "Pharmacy/redux/PharmacyRedux/CreateAdmin/createAdminAction";
import { deleteAdminAction } from "Pharmacy/redux/PharmacyRedux/DeleteAdmin/deleteAdminAction";

const AdminsScreen = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch: any = useDispatch();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showAddFields, setShowAddFields] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>();

  const { userData } = useSelector((state: RootState) => state.userReducer);
  const hasMounted = useRef(false);

  const { adminsLoading, allAdmins } = useSelector(
    (state: RootState) => state.listAllAdminsReducer
  );

  const { createLoading, createdAdmin } = useSelector(
    (state: RootState) => state.createAdminReducer
  );

  const handleAddClick = () => {
    formik.setValues({
      username: null,
      password: null,
    });
    setShowAddFields(true);
  };

  const handleDeleteClick = async (username: any) => {
    await dispatch(deleteAdminAction({ username: username }));
    await dispatch(listAllAdminsAction(userData?._id));
    notification.success({
      message: "Admin deleted Successfully",
      placement: "topRight",
    });
  };

  const formik = useFormik({
    initialValues: {
      username: null,
      password: null,
    },
    onSubmit: async (values: AdminModel) => {
      // await dispatch(
      //   createPostAction({
      //     title: values.title,
      //   })
      // );
      await dispatch(createAdminAction(values));
      notification.success({
        message: "Admin created Successfully",
        placement: "topRight",
      });
    },
  });

  const checkCreatedAdmin = () => {
    if (createdAdmin?.status && createdAdmin?.status === 409) {
      notification.error({
        message: "User already exists!",
        placement: "topRight",
      });
      return "fail";
    }
    dispatch(listAllAdminsAction(userData?._id));
    setSelectedPackage(null);
    setShowAddFields(false);
    return "success";
  };

  useEffect(() => {
    // This effect will be triggered whenever `createdAdmin` changes.
    if (hasMounted.current) {
      checkCreatedAdmin();
    } else {
      hasMounted.current = true;
    }
  }, [createdAdmin]);

  const checkErrors = () => {
    var errorExists: any[] = [false];

    // if (formik.values.category_id.toString().trim() === "") {
    //   formik.setFieldError("category_id", "Please Provide this field");
    //   errorExists[0] = true;
    //   errorExists.push("category_id");
    // }

    if (!errorExists[0]) {
      // dispatch(setProgressStateAction(progressState + 1));
    }
  };

  const generateFieldRow = (fields: any) => {
    return (
      <div className="w-full flex justify-center items-start gap-x-3">
        {fields?.map((field: any) => (
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
    dispatch(listAllAdminsAction(userData?._id));
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="pb-24">
      <div
        className={`w-full flex flex-col flex-wrap items-start justify-center`}
      >
        {adminsLoading ? (
          <div className={`${styles.spinnerContainer}`}>
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <div className="w-full flex flex-wrap justify-start items-center">
            {Array.isArray(allAdmins) &&
              allAdmins?.map((currAdmin: any) => (
                <div
                  key={currAdmin._id}
                  className={`${styles.packageItem} mt-5 mr-5`}
                >
                  <div className="w-full flex justify-between items-center mb-2">
                    <h1>{currAdmin?.username}</h1>
                    {/* <p className={`${styles.editLink}`}>Edit</p> */}
                    <DeleteOutlined
                      style={{ color: "red" }}
                      onClick={() => handleDeleteClick(currAdmin?.username)}
                    />
                  </div>
                  <p>Password: {currAdmin?.password}</p>
                </div>
              ))}
            <div className={`${styles.plusIcon}`} onClick={handleAddClick}>
              <PlusOutlined />
            </div>
          </div>
        )}

        {showAddFields && (
          <div className="w-[40rem]  flex flex-col justify-center items-start mt-12">
            {generateFieldRow([
              {
                title: "Username",
                name: "username",
                value: formik.values.username,
                status: formik.errors.username ? "error" : "",
                error: formik.errors.username,
              },
              {
                title: "Password",
                name: "password",
                value: formik.values.password,
                status: formik.errors.password ? "error" : "",
                error: formik.errors.password,
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
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default AdminsScreen;
