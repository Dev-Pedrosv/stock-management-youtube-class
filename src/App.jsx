import { useState, useEffect } from "react";

import { Box, LinearProgress } from "@mui/material";
import { api } from "./api/api";
import { GridItems } from "./components/GridItems";
import { Screen } from "./components/Screen";
import { Header } from "./components/Header";
import { CustomModal } from "./components/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [defaultValues, setDefaultValues] = useState(null);

  const defaultProps = {
    position: "top-right",
    autoClose: 1000,
    closeOnClick: true,
    draggable: true,
  };

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData(api.rows);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (e, data) => {
    setDefaultValues(data);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setDefaultValues(null);
  };

  const createdProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36),
      valueStock: product.price * product.quantity,
    };

    setData([...data, newProduct]);
    toast.success("Produto criado com sucesso", defaultProps);
  };

  const deleteProduct = (id) => {
    setData(data.filter((d) => d.id !== id));
    toast.success("Produto deletado com sucesso", defaultProps);
  };

  const updatedProduct = (product) => {
    setData((prevData) =>
      prevData.map((d) => {
        if (d.id === product.id) {
          return {
            ...d,
            ...product,
          };
        }
        return d;
      })
    );
    toast.success("Produto atualizado com sucesso", defaultProps);
  };

  const submitData = (data, isUpdate) => {
    if (isUpdate) {
      updatedProduct(data);
      return;
    }
    createdProduct(data);
  };

  return (
    <Screen>
      {isLoading && <LinearProgress sx={{ background: "#121e58" }} />}
      <Header onClick={handleOpenModal} />
      <Box className={`w-full  shadow-lg rounded-2xl bg-zinc-50 h-screen p-3`}>
        <GridItems
          rows={data}
          handleOpenModal={(e, params) => handleOpenModal(e, params)}
          deleteProduct={(id) => deleteProduct(id)}
        />
      </Box>

      {open && (
        <CustomModal
          open={open}
          handleClose={handleCloseModal}
          defaultValues={defaultValues}
          submit={(data, isUpdate) => submitData(data, isUpdate)}
        />
      )}

      <ToastContainer />
    </Screen>
  );
}

export default App;
