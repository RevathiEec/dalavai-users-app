import React, { useEffect, useState } from "react";
import { fetchUsers } from "./userservice";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Light mode icon

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const appContainerStyle = {
    background: darkMode
      ? "linear-gradient(135deg, #1e1e1e, #3a3a3a)"
      : "linear-gradient(135deg, #dfe9ff, #fffafc)",
    minHeight: "100vh",
    color: darkMode ? "white" : "black",
    paddingBottom: "40px",
    transition: "0.4s",
  };

  const cardStyle = {
    backdropFilter: "blur(12px)",
    background: darkMode
      ? "rgba(50, 50, 50, 0.6)"
      : "rgba(255, 255, 255, 0.4)",
    border: darkMode
      ? "1px solid rgba(255, 255, 255, 0.2)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    borderRadius: "16px",
    transition: "0.4s",
  };

  return (
    <div style={appContainerStyle}>
      <AppBar position="static" style={{ background: darkMode ? "#222" : "#5a00b3" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">User Directory</Typography>

          {/* 🌙 Toggle Button */}
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "25px" }}>
        <TextField
          label="Search by Name"
          fullWidth
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: darkMode ? "#333" : "white",
            borderRadius: "8px",
            color: darkMode ? "white" : "black",
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#ccc" : "#555" },
          }}
        />

        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                  <Typography color="inherit">{user.email}</Typography>
                  <Typography>{user.phone}</Typography>
                  <Typography>{user.website}</Typography>
                  <Typography>
                    {user.address.city}, {user.address.street}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
