import { Button, Input } from "antd";
import styles from "VirtualClinic/components/HealthPackageCard/HealthPackageCard.module.css";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNav } from "VirtualClinic/hooks/useNav";
import { getDoctorInfoAction } from "VirtualClinic/redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import DoctorIcon from "VirtualClinic/assets/images/SvgComponents/DoctorIcon";
import {
  DollarIcon,
  Dots,
  EducationIcon,
  HospitalIcon,
  RightArrowIcon,
  XIcon,
} from "VirtualClinic/assets/IconComponents";
import moment from "moment";

interface HealthPackageCardProps {
  packageItem: any;
  unsubscribeCallback: any;
  subscribeCallback: any;
}

const HealthPackageCard: FC<HealthPackageCardProps> = ({
  packageItem,
  unsubscribeCallback,
  subscribeCallback,
}) => {
  const inverted = packageItem.status === "SUBSCRIBED";
  return (
    <div
      key={packageItem._id}
      className={`${styles.packageItem} ${inverted && styles.packageItemInv}
      ${inverted && styles.packageItemHoverInv}
      ${styles.packageItemHover} mt-5 mr-5`}
    >
      <div>
        <div
          className={`${styles.packageName} ${styles.uppercase}`}
          style={
            inverted
              ? {
                  backgroundColor: "var(--dark-green)",
                  color: "var(--light-green)",
                }
              : {
                  color: "var(--dark-green)",
                }
          }
        >
          <p>{packageItem.type} PACKAGE</p>
        </div>
        <p className="mt-2">
          {/* ORIGINAL PRICE */}
          {packageItem.discountedPrice ? (
            <p
              style={{
                textDecoration: "line-through",
                opacity: 0.7,
              }}
            >
              {packageItem.price_per_year?.toLocaleString()} EGP
            </p>
          ) : (
            <br />
          )}
          {/* DISCOUNTED PRICE */}
          <h1 className={`${styles.price}`}>
            {packageItem.discountedPrice?.toLocaleString() ||
              packageItem.price_per_year?.toLocaleString()}{" "}
            EGP
          </h1>
        </p>
      </div>
      <div className="flex flex-col gap-y-[1.6rem] mt-2">
        <div className={`flex gap-x-3 leading-tight`}>
          <div
            className={`${styles.arrowCircle}`}
            style={{
              backgroundColor: inverted
                ? "var(--dark-green)"
                : "var(--light-green)",
              color: inverted ? "var(--light-green)" : "var(--dark-green)",
            }}
          >
            <RightArrowIcon />
          </div>
          {packageItem.doctor_session_discount * 100}% off sessions
        </div>
        <div className="flex gap-x-3 leading-tight">
          <div
            className={`${styles.arrowCircle}`}
            style={{
              backgroundColor: inverted
                ? "var(--dark-green)"
                : "var(--light-green)",
              color: inverted ? "var(--light-green)" : "var(--dark-green)",
            }}
          >
            <RightArrowIcon />
          </div>
          {packageItem.medicine_discount * 100}% off medicines
        </div>
        <div className="flex gap-x-3 leading-tight font-normal">
          <div
            className={`${styles.arrowCircle}`}
            style={{
              backgroundColor: inverted
                ? "var(--dark-green)"
                : "var(--light-green)",
              color: inverted ? "var(--light-green)" : "var(--dark-green)",
            }}
          >
            <RightArrowIcon />
          </div>
          {packageItem.family_discount * 100}% off subscriptions for family
          members
        </div>
      </div>

      {!packageItem.status && (
        <>
          <br />
          <br />
        </>
      )}
      {packageItem.status === "CANCELLED" && (
        // Render END DATE if status is "CANCELLED"
        <p className={`${styles.uppercase}`}>
          End Date
          <p>
            {moment(packageItem.healthPackageRenewalDate).format("DD/MM/YYYY")}
          </p>
        </p>
      )}
      {packageItem.status === "UNSUBSCRIBED" && (
        // Render VALID UNTIL if status is "UNSUBSCRIBED"
        <p className={`${styles.uppercase}`}>
          Valid Until
          <p>
            {moment(packageItem.healthPackageRenewalDate).format("DD/MM/YYYY")}
          </p>
        </p>
      )}
      {packageItem.status === "SUBSCRIBED" && (
        // Render RENEWAL DATE if status is "SUBSCRIBED"
        <p className={`${styles.uppercase}`}>
          Renewal Date
          <p>
            {moment(packageItem.healthPackageRenewalDate).format("DD/MM/YYYY")}
          </p>
        </p>
      )}

      {/* BUTTON */}
      {packageItem.status === "SUBSCRIBED" ? (
        // Render UNSUBSCRIBE button if status exists
        <Button
          className={`${
            inverted ? styles.checkoutBtnInv : styles.checkoutBtn
          } w-[90%]`}
          style={{ alignSelf: "center" }}
          onClick={unsubscribeCallback}
        >
          <p className="text-center" style={{ flex: 1 }}>
            UNSUBSCRIBE
          </p>

          {/* {!loading && icon} */}
          <XIcon />
        </Button>
      ) : (
        // Render SUBSCRIBE button if status doesn't exist
        <Button
          className={`${
            inverted ? styles.checkoutBtnInv : styles.checkoutBtn
          } w-[90%]`}
          style={{ alignSelf: "center" }}
          onClick={subscribeCallback}
        >
          <p className="text-center" style={{ flex: 1 }}>
            SUBSCRIBE
          </p>

          {/* {!loading && icon} */}
          <XIcon />
        </Button>
      )}
    </div>
  );
};

export default HealthPackageCard;
