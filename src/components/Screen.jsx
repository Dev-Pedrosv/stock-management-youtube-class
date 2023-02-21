import { Box } from "@mui/material";

export function Screen({ children }) {
  return (
    <Box className="w-screen h-screen flex flex-col p-12 gap-4 bg-zinc-200">
      {children}
    </Box>
  );
}
