import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Inventory2, AddBox, SwapHoriz, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        color: "#111827",
        px: 2,
      }}
    >
      <Toolbar sx={{ minHeight: 72, display: "flex", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexGrow: 1,
          }}
        >
          <Inventory2 sx={{ color: "#15176b", fontSize: 32 }} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#15176b",
              letterSpacing: 0.5,
            }}
          >
            Almoxarifado SENAI
          </Typography>
        </Box>

        <Button
          component={Link}
          to="/itens"
          startIcon={<AddBox />}
          sx={{
            color: "#4b5563",
            fontWeight: 600,
            borderRadius: "12px",
            px: 2,
            py: 1,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#eef2ff",
              color: "#15176b",
            },
          }}
        >
          Cadastro
        </Button>

        <Button
          component={Link}
          to="/movimentacoes"
          startIcon={<SwapHoriz />}
          sx={{
            color: "#4b5563",
            fontWeight: 600,
            borderRadius: "12px",
            px: 2,
            py: 1,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#eef2ff",
              color: "#15176b",
            },
          }}
        >
          Movimentações
        </Button>

        <Button
          onClick={logout}
          startIcon={<Logout />}
          variant="contained"
          sx={{
            background: "#15176b",
            borderRadius: "12px",
            px: 2.5,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": {
              background: "#0f1254",
              boxShadow: "0 8px 20px rgba(21,23,107,0.25)",
            },
          }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}