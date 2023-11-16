import styles from "Pharmacy/screens/User Screens/Admin Screens/MedicineScreen/MedicineScreen.module.css";
import { useNav } from "hooks/useNav";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Pharmacy/redux/rootReducer";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Input, Select } from "antd";
import { listAllMedicinesAction } from "Pharmacy/redux/PharmacyRedux/ListAllMedicines/listAllMedicinesAction";
import { allMedicinalUsesAction } from "Pharmacy/redux/PharmacyRedux/Dropdowns/AllMedicinalUses/allMedicinalUsesAction";
interface DataType {
  patientEmail: string;
  pharmacistEmail: string;
  date: string;
  time: string;
  status: string;
  key: string;
}
type DataIndex = keyof DataType;

const MedicineScreen = () => {
  // const { addingFamMemLoading, confirm } = useSelector(
  //   (state: RootState) => state.createAppointmentReducer
  // );

  const [searchText, setSearchText] = useState("");
  const [dropdownText, setDropdownText] = useState<any>([]);
  const [currAllMedicines, setCurrAllMedicines] = useState<any>([]);

  const { userData, userType } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { medicinesLoading, allMedicines } = useSelector(
    (state: RootState) => state.listAllMedicinesReducer
  );

  const { medicinalUsesLoading, allMedicinalUses } = useSelector(
    (state: RootState) => state.allMedicinalUsesReducer
  );

  function isSubset(subsetArray: any, mainArray: any) {
    return subsetArray.every((item: any) => mainArray.includes(item));
  }

  const handleSearchClick = () => {
    const filteredMedicines = allMedicines.filter((medicine: any) =>
      medicine.name.toLowerCase().includes(searchText?.toLowerCase())
    );

    if (dropdownText !== "") {
      const filteredMedicinesWithDropdown = filteredMedicines.filter(
        (medicine: any) => isSubset(dropdownText, medicine.medicinalUse)
      );
      setCurrAllMedicines(filteredMedicinesWithDropdown);
    } else setCurrAllMedicines(filteredMedicines);
  };

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(listAllMedicinesAction());
    dispatch(allMedicinalUsesAction());
  }, []);

  useEffect(() => {
    setCurrAllMedicines(allMedicines);
  }, [allMedicines]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Patient Medicine Screen</h1>
      {/* <Table dataSource={data} columns={columns} /> */}
      <div className="flex items-center mb-6">
        <Input
          className="w-[15rem] mr-3"
          size="large"
          type="text"
          name="search"
          onKeyPress={handleKeyPress}
          placeholder="Search for medicine by name"
          onChange={(event: any) => {
            setSearchText(event?.target?.value);
          }}
        />
        {/* create a dropdown using select from antd */}
        <Select
          mode="multiple"
          allowClear
          className="w-[25rem] mr-3"
          size="large"
          placeholder="Medicinal Use"
          options={allMedicinalUses.map((medicinalUse: any) => ({
            value: medicinalUse,
            label: medicinalUse,
          }))}
          // defaultValue="name"
          onChange={(value: any) => {
            setDropdownText(value);
          }}
        />
        <div className={`${styles.searchButton}`} onClick={handleSearchClick}>
          <SearchOutlined />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        {currAllMedicines?.map((medicine: any) => (
          <div className={`flex ${styles.mainContainer}`}>
            <div className={`${styles.imageContainer}`}>
              <div
                style={{
                  backgroundImage: `url('${encodeURI(medicine.picture)}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div
              className={`w-full flex flex-col justify-between ${styles.dataContainer}`}
            >
              <div>
                <h1>
                  <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={
                      medicine.name ? medicine.name.toString() : ""
                    }
                  />
                </h1>
                <p>{medicine.description}</p>
              </div>
              <p className={`w-full flex justify-end`}>EGP {medicine.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineScreen;
