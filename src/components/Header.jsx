import { Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Button } from "./Button";

export function Header({ onClick }) {
  return (
    <Box className="w-full flex items-center p-4 justify-between shadow-lg rounded-2xl bg-zinc-50">
      <p className="text-3xl font-bold text-zinc-900">Gestão de Estoque</p>

      <Button onClick={onClick}>
        <div className="flex gap-2">
          <Add />
          Adicionar novo item
        </div>
      </Button>
    </Box>
  );
}
