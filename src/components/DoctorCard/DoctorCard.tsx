import { Input } from "antd";
import styles from "components/DoctorCard/DoctorCard.module.css";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getDoctorInfoAction } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import DoctorIcon from "assets/images/DoctorIcon";

interface DoctorCardProps {
  doctor: any;
}

const DoctorCard: FC<DoctorCardProps> = ({ doctor }) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const getDoctorName = async (doctorUsername: any) => {
    await dispatch(getDoctorInfoAction({ username: doctorUsername }));
    navigate("/doctor-info");
  };

  return (
    <div className={`w-full h-full flex flex-col justify-center items-center`}
    style={{
      overflowY: "auto",
    }}
    >
      <div className={`${styles.doctorCard}`}>
        {/* IMAGE, NAME, SPECIALTY */}
        <div className={`${styles.cardItem} ${styles.double}`}>
          {/* IMAGE */}
          <div className={`${styles.imageCircle}`}>
            <DoctorIcon color="var(--light-green)" />
            {/* <i className="fa-solid fa-user-doctor fa-2xl"></i> */}
          </div>
          <div className={`w-full h-[80%] flex flex-col justify-between items-start`}>
            <div>
              <h1 className={`text-2xl font-bold`} style={{lineHeight: "1.2"}}>
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
        </div>

        {/* EDUCATION */}
        <div className={`${styles.cardItem} text-xl font-bold`}>
          {doctor?.educationalBackground}
        </div>

        {/* If hourlyRate * 1.1 is less than session price, then display the houlryRate * 1.1 with strikethrough and the session_price next to it */}
        {/* Else, display the session price */}
        <div className={`${styles.cardItem}`}>
          {/* <i className="fa-solid fa-money-bill-wave"></i> */}
          <p>Session Price :</p>
          {doctor?.hourlyRate * 1.1 > doctor?.session_price ? (
            <>
              <span className={`line-through`}>
                EGP{" "}
                {(doctor?.hourlyRate * 1.1)?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>{" "}
              EGP{" "}
              {doctor?.session_price?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </>
          ) : (
            /*  button */
            <>
              <span>
                EGP{" "}
                {doctor?.session_price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </>
          )}
          <a
            onClick={() => {
              getDoctorName(doctor?.username);
            }}
            className={`text-blue-500 hover:text-blue-700 cursor-pointer`}
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
