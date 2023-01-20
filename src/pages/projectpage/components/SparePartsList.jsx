import { useColdRoomStore } from "@contexts/ColdRoomContext";
import DeleteIcon from '@mui/icons-material/Delete';
// @mui material components
import Card from "@mui/material/Card";
import { Stack } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import DataTable from "@components/Tables/DataTable";


function SparePartsList ({ spareParts, handleOpenSparePart }) {
  const coldRoomStore = useColdRoomStore()

  function handleClick(id) {
    coldRoomStore.deleteSparePart(id)
  }

  function Button({id}) {
    return (
      <SoftButton variant="text" color="error" onClick={() => handleClick(id)}>
        <DeleteIcon>Supprimer</DeleteIcon>&nbsp;Supprimer
      </SoftButton>
    )
  } 
  
  const dataTableData = {
    columns: [
      { Header: "name", accessor: "name" },
      { Header: "Action", accessor: "button" }
    ],
  
    rows: 
    spareParts.map((sparePart) => 
      ({
      name: sparePart.name,
      button: <Button id={sparePart.id} />
      })
    ),
  };

  return (
    <SoftBox my={3}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
          <SoftBox lineHeight={1}>
            <SoftTypography variant="h5" fontWeight="medium">
              Pièces détachées
            </SoftTypography>
          </SoftBox>
          <Stack spacing={2} direction="row">
            <SoftButton color="success" size="medium" onClick={handleOpenSparePart}>
              nouvelle pièce détachée
            </SoftButton>
          </Stack>
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

export default SparePartsList;
