/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable react/prop-types */
// Soft UI Dashboard PRO React components
import SoftBadge from "@components/SoftBadge";

// ProductsList page components
import ProductCell from "@pages/dashboard/components/ProductCell";
import ActionCell from "@pages/dashboard/components/ActionCell";

// Badges
const created = (
  <SoftBadge variant="contained" color="secondary" size="xs" badgeContent="Sauvegardé" container />
);
const sent = (
  <SoftBadge variant="contained" color="success" size="xs" badgeContent="envoyé" container />
);

const dataTableData = {
  columns: [
    {
      Header: "projet",
      accessor: "product",
      width: "40%",
      Cell: ({ value: [name, data] }) => (
        <ProductCell image={data.image} name={name} checked={data.checked} />
      ),
    },
    { Header: "Date de création", accessor: "created_at" },
    { Header: "Fournisseurs", accessor: "suppliers" },
    { Header: "nombre de CF", accessor: "coldRoomsQty" },
    { Header: "Date d'envoie", accessor: "sent_at" },
    {
      Header: "status",
      accessor: "status",
      Cell: ({ value }) => (value === "sent" ? sent : created),
    },
    { Header: "actions", accessor: "action" },
  ],

  rows: [
    
  ],
};

export default dataTableData;
