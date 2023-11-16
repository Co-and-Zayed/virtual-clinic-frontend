import { Input } from "antd";
import styles from "components/DoctorCard/DoctorCard.module.css";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { getDoctorInfoAction } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import DoctorIcon from "assets/images/SvgComponents/DoctorIcon";
import {
  DollarIcon,
  EducationIcon,
  HospitalIcon,
  RightArrowIcon,
} from "assets/IconComponents";
import { SET_DOCTOR_CARD_COORDS } from "redux/VirtualClinicRedux/types";
import { useNav } from "hooks/useNav";

interface DoctorCardProps {
  doctor: any;
  noBooking?: boolean;
  discountedPrice?: number | null;
}

const DoctorCard: FC<DoctorCardProps> = ({
  doctor,
  noBooking,
  discountedPrice,
}) => {
  const dispatch: any = useDispatch();
  const navigate = useNav();

  const sessionPrice = discountedPrice
    ? discountedPrice
    : doctor?.session_price;

  const getDoctorName = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    doctorUsername: any
  ) => {
    const clientY = event.clientY;

    dispatch({
      type: SET_DOCTOR_CARD_COORDS,
      payload: {
        x: 0,
        y: clientY - 13 * 16,
        // y: cardYCenter,
      },
    });

    navigate("/doctor/" + doctorUsername);
  };

  return (
    <div id="doctorCard" className={`${styles.doctorCard}`}>
      {/* IMAGE, NAME, SPECIALTY */}
      <div className={`${styles.cardItem} ${styles.double}`}>
        {/* IMAGE */}
        <div className={`${styles.imageCircle}`}>
          <DoctorIcon color="var(--light-green)" />
        </div>
        <div
          className={`w-full h-[80%] flex flex-col justify-between items-start`}
        >
          <div>
            <h1 className={`text-2xl font-bold`} style={{ lineHeight: "1.2" }}>
              {/* <span className="text-lg" style={{ fontWeight: 600 }}>
                  Doctor{" "}
                </span> */}

              {doctor?.name}
            </h1>
            <p className="text-sm">{doctor?.specialty}</p>
          </div>
          <p className="text-xs centuryGothic">{doctor?.email}</p>
        </div>
      </div>

      {/* AFFILIATION */}
      <div className={`${styles.cardItem} text-xl font-bold`}>
        {doctor?.affiliation}
        <HospitalIcon
          className={`${styles.bgImage}`}
          width=""
          height=""
          style={{
            left: "-0.7rem",
            bottom: "-1.2rem",
          }}
        />
      </div>

      {/* EDUCATION */}
      <div className={`${styles.cardItem} text-xl font-bold`}>
        {doctor?.educationalBackground}
        <EducationIcon
          className={`${styles.bgImage}`}
          width=""
          height=""
          style={{
            left: "-3.0rem",
            bottom: "-1.4rem",
          }}
        />
      </div>

      {/* SESSION PRICE */}
      <div className={`${styles.cardItem} ${styles.priceCol}`}>
        {/* PRICE */}
        <div className="flex flex-col items-center justify-center gap-y-[0.1rem] lineH mt-2">
          {/* DISCOUNTED */}
          <p
            className={`${styles.priceLight} ${styles.lineThrough}`}
            style={{
              visibility:
                doctor?.hourlyRate * 1.1 > sessionPrice ? "visible" : "hidden",
            }}
          >
            {(doctor?.hourlyRate * 1.1)
              ?.toLocaleString
              // undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}
              ()}{" "}
            EGP
          </p>
          {/* ACTUAL */}
          <p className={`${styles.price}`}>
            {sessionPrice?.toLocaleString()} EGP
          </p>
          <p className={`${styles.priceLight}`}>per session</p>
        </div>

        {/* BOOK A SESSION LINK */}
        {!noBooking && (
          <a
            onClick={(event) => {
              getDoctorName(event, doctor?.username);
            }}
            className={`${styles.bookSession}`}
          >
            <p>Book a session</p>
            <div className={`${styles.textGap}`}></div>
            <RightArrowIcon height="10px" />
          </a>
        )}

        <DollarIcon
          className={`${styles.bgImage}`}
          width=""
          height=""
          style={{
            height: "90%",
            left: "-0.7rem",
            bottom: "-1.5rem",
          }}
        />
      </div>
    </div>
  );
};

export default DoctorCard;
