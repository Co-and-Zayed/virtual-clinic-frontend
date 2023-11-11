import { Input } from "antd";
import styles from "components/AppointmentCard/AppointmentCard.module.css";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getDoctorInfoAction } from "redux/VirtualClinicRedux/GetDoctorInfo/getDoctorInfoAction";
import DoctorIcon from "assets/images/SvgComponents/DoctorIcon";
import {
  DollarIcon,
  Dots,
  EducationIcon,
  HospitalIcon,
  RightArrowIcon,
} from "assets/IconComponents";
import moment from "moment";

interface AppointmentCardProps {
  appointment: any;
}

const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div id="appointmentCard" className={`${styles.appointmentCard}`}>
      {/* IMAGE, NAME, SPECIALTY */}
      <div className={`${styles.cardItem}`}>
        {/* IMAGE */}
        <div className={`${styles.imageCircle}`}>
          <DoctorIcon color="var(--light-green)" size={45} />
        </div>
        <div
          className={`w-full h-full flex flex-col justify-between items-start`}
        >
          <div>
            <h1
              className={`text-2xl font-bold mt-1`}
              style={{ lineHeight: "1.2" }}
            >
              {/* <span className="text-lg" style={{ fontWeight: 600 }}>
                  Doctor{" "}
                </span> */}

              {appointment.doctor?.name}
            </h1>
            <p className="text-sm">{appointment.doctor?.specialty}</p>
          </div>
          <div className="w-full flex items-end justify-between">
            <p className="text-xs centuryGothic">{appointment.doctor?.email}</p>

            {/* time text-2xl */}
            <p className="text-2xl font-semibold" style={{ lineHeight: "1" }}>
              {moment(appointment.date).format("h:mm A")}
            </p>
          </div>
        </div>
      </div>
      {/* Three dots at top right */}
      <div className={`${styles.threeDots}`}
      style={{
        position: "absolute",
        top: "1rem",
        right: "0.8rem",
      
      }}>
        <Dots fontSize={16}/>
      </div>
    </div>
  );
};

export default AppointmentCard;
