import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

const PrescriptionsScreen = () => {
    const prescriptions = [
        {
          id: 1,
          patientName: 'John Doe',
          doctorName: 'Dr. Smith',
          date: new Date('2023-10-06'),
          filled: true,
        },
        {
          id: 2,
          patientName: 'Jane Doe',
          doctorName: 'Dr. Johnson',
          date: new Date('2023-10-05'),
          filled: false,
        }
      ];

      interface DataType {
        key: React.Key;
        doctorName: string;
        date: Date;
        filled: boolean;
      }



    return ( 
        <div>Prescriptions Screen</div>
     );
}
 
export default PrescriptionsScreen;