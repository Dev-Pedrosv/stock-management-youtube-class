import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { Button } from "./Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    product: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
    price: yup
      .number()
      .positive()
      .required("Campo obrigatório")
      .typeError("O campo deve ser do tipo number"),
    quantity: yup
      .number()
      .positive()
      .required("Campo obrigatório")
      .typeError("O campo deve ser do tipo number"),
  })
  .required();

export function CustomModal({ open, handleClose, defaultValues, submit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      product: defaultValues?.row?.product,
      description: defaultValues?.row?.description,
      price: defaultValues?.row?.price,
      quantity: defaultValues?.row?.quantity,
    },
  });

  const handleCloseModal = () => {
    reset();
    handleClose();
  };

  const onSubmit = (data) => {
    if (defaultValues) {
      data = {
        ...defaultValues.row,
        ...data,
      };
      submit(data, true);
      handleCloseModal();
      return;
    }
    submit(data);
    handleCloseModal();
    return;
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center "
    >
      <Box className="bg-gray-100 w-6/12  rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <p id="modal-modal-title" className="text-xl font-bold text-zinc-900">
            Cadastrar novo item
          </p>
          <button
            onClick={handleCloseModal}
            className="bg-zinc-900 hover:bg-zinc-700 rounded-full p-2"
          >
            <CloseIcon className="text-white" />
          </button>
        </div>
        <Divider />

        <form
          className="flex w-full flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                {...register("product")}
                className="w-full"
                id="outlined-basic"
                label="Produto*"
                variant="outlined"
                error={errors?.product?.message}
                helperText={errors?.product?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register("description")}
                className="w-full"
                id="outlined-basic"
                label="Descrição*"
                variant="outlined"
                helperText={errors?.description?.message}
                error={errors?.description?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                {...register("price")}
                className="w-full"
                id="outlined-basic"
                label="Preço*"
                variant="outlined"
                error={errors?.price?.message}
                helperText={errors?.price?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register("quantity")}
                className="w-full"
                id="outlined-basic"
                label="Quantidade*"
                variant="outlined"
                error={errors?.quantity?.message}
                helperText={errors?.quantity?.message}
              />
            </Grid>
          </Grid>

          <Button type="submit">Cadastrar</Button>
        </form>
      </Box>
    </Modal>
  );
}
