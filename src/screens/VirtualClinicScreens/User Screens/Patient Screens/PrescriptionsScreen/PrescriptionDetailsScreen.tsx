import { useParams } from "react-router";

const PrescriptionDetailsScreen = () => {
    const { id } = useParams<{ id: string }>();
    return ( 
        <div>
            <h1>Prescription Detail</h1>
            <div>{id}</div>
        </div>
     );
}
 
export default PrescriptionDetailsScreen;