import { useColdRoomStore } from "@contexts/ColdRoomContext";
import DeleteIcon from '@mui/icons-material/Delete';
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DataTable from "@components/Tables/DataTable";


function ACList ({ ACs }) {
  const coldRoomStore = useColdRoomStore()

  function handleClick(id) {
    coldRoomStore.deleteAC(id)
  }

  function Button({id}) {
    return (
      <SoftButton variant="text" color="error" onClick={() => handleClick(id)}>
        <DeleteIcon />
      </SoftButton>
    )
  } 
  
  const dataTableData = {
    columns: [
      { Header: "name", accessor: "name" },
      { Header: "Action", accessor: "button" }
    ],
  
    rows: 
    ACs.map((AC) => 
      ({
      name: AC.name,
      button: <Button id={AC.id} />
      })
    ),
  };

  return (
    <SoftBox my={3} sx={ACs.length > 0 ? {} : {display: 'none'}}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
          <SoftBox lineHeight={1}>
            <SoftTypography variant="h5" fontWeight="medium">
              Pièces à climatiser
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <DataTable
          table={dataTableData}
          entriesPerPage={{
            defaultValue: 5,
            entries: [5, 10],
          }}
        />
      </Card>
    </SoftBox>
  );
}

export default ACList;
