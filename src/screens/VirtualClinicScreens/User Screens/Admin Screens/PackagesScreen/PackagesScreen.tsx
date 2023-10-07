import styles from "screens/VirtualClinicScreens/User Screens/Admin Screens/PackagesScreen/PackagesScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import { listAllPackagesAction } from "redux/VirtualClinicRedux/ListAllPackages/listAllPackagesAction";

const PackagesScreen = () => {
  const dispatch: any = useDispatch();

  const { packagesLoading, allPackages } = useSelector(
    (state: RootState) => state.listAllPackagesReducer
  );

  useEffect(() => {
    dispatch(listAllPackagesAction()); // sending the request, and update the states
    console.log(allPackages);
  }, []);

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Admin Packages Screen</h1>
      {packagesLoading ? (
        <h1>Loading...</h1>
      ) : (
        allPackages?.map((packageItem: any) => (
          <div key={packageItem._id} className={`${styles.packageItem} m-5`}>
            <h1>{packageItem.name}</h1>
            <p>EGP {packageItem.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PackagesScreen;
