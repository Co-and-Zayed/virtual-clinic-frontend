import styles from "screens/VirtualClinicScreens/User Screens/Admin Screens/AdminsScreen/AdminsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { listAllAdminsAction } from "redux/VirtualClinicRedux/ListAllAdmins/listAllAdminsAction";
import { FormikHelpers, useFormik } from "formik";
import { Input, notification, Spin, Table } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AdminModel from "models/AdminModel";
import { createAdminAction } from "redux/VirtualClinicRedux/CreateAdmin/createAdminAction";
import { deleteAdminAction } from "redux/VirtualClinicRedux/DeleteAdmin/deleteAdminAction";
import JellyLoader from "components/JellyLoader/JellyLoader";

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
    console.log("CREATED ADMINzzzzz:", createdAdmin);
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
  const [showChangePasswordFields, setShowChangePasswordFields] = useState<boolean>(false);

  const handleShowChangePasswordClick = () => {
    setShowChangePasswordFields(true);
  };

  useEffect(() => {
    dispatch(listAllAdminsAction(userData?._id));
    console.log("All Admins", allAdmins);
  }, []);

  const handleChangePassword = async () => {
    
    console.log('Username:', formik.values.username);
    console.log('Old Password:', formik.values.oldPassword);
    console.log('New Password:', formik.values.newPassword);

    formik.setValues({
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowChangePasswordFields(false);
    notification.success({
      message: "Password changed Successfully",
      placement: "topRight",
    });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="pb-24">
      <div
        className={`w-full flex flex-col flex-wrap items-start justify-center`}
      >
        {adminsLoading ? (
          <div className={`${styles.spinnerContainer}`}>
            <JellyLoader />
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
                title: 'Username',
                name: 'username',
                value: formik.values.username,
                status: formik.errors.username ? 'error' : '',
                error: formik.errors.username,
              },
              {
                title: 'Password',
                name: 'password',
                value: formik.values.password,
                status: formik.errors.password ? 'error' : '',
                error: formik.errors.password,
              },
            ])}
            <div className="w-full flex justify-end gap-x-2">
              <button
                className="bg-[blue]"
                style={{ alignSelf: 'center' }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {showChangePasswordFields && (
          <div className="w-[40rem] flex flex-col justify-center items-start mt-12">
            {generateFieldRow([
              {
                title: 'Username',
                name: 'username',
                value: formik.values.username,
                status: formik.errors.username ? 'error' : '',
                error: formik.errors.username,
              },
              {
                title: 'Old Password',
                name: 'oldPassword',
                value: formik.values.oldPassword,
                status: formik.errors.oldPassword ? 'error' : '',
                error: formik.errors.oldPassword,
              },
              {
                title: 'New Password',
                name: 'newPassword',
                value: formik.values.newPassword,
                status: formik.errors.newPassword ? 'error' : '',
                error: formik.errors.newPassword,
              },
              {
                title: 'Confirm Password',
                name: 'confirmPassword',
                value: formik.values.confirmPassword,
                status: formik.errors.confirmPassword ? 'error' : '',
                error: formik.errors.confirmPassword,
              },
            ])}
            <div className="w-full flex justify-end gap-x-2">
              <button
                className="bg-[blue]"
                onClick={handleChangePassword}
                type="button"
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default AdminsScreen;
