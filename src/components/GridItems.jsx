import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Edit, DeleteOutline } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";

export function GridItems({ handleOpenModal, deleteProduct, rows }) {
  const [pageSize, setPageSize] = useState(10);
  const onChangePageSize = (event) => setPageSize(event);

  const getActions = (params) => {
    return [
      <GridActionsCellItem
        showInMenu
        icon={<Edit />}
        label="Editar"
        onClick={(e) => handleOpenModal(e, params)}
      />,
      <GridActionsCellItem
        showInMenu
        icon={<DeleteOutline />}
        label="Remover"
        onClick={() => deleteProduct(params?.row?.id)}
      />,
    ];
  };

  const columns = [
    {
      field: "id",
      headerName: "ID de estoque",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "product",
      headerName: "Produto",
      width: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Preço",
      flex: 1,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => {
        return params?.row?.price?.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });
      },
    },
    {
      field: "quantity",
      headerName: "Quantidade em estoque",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "valueStock",
      headerName: "Valor de estoque",
      headerAlign: "right",
      flex: 1,
      align: "right",
      renderCell: (params) => {
        return params?.row?.valueStock?.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });
      },
    },
    {
      field: "actions",
      type: "actions",
      headerAlign: "center",
      width: 50,
      getActions,
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      sx={{ border: "none" }}
      rowsPerPageOptions={[5, 10, 20, 50, 100]}
      pageSize={pageSize}
      onPageSizeChange={onChangePageSize}
    />
  );
}
