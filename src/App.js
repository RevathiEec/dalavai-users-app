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
  Avatar,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./App.css";

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

  const handleSort = (e) => {
    const value = e.target.value;
    if (value === "az") {
      setUsers([...users].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (value === "za") {
      setUsers([...users].sort((a, b) => b.name.localeCompare(a.name)));
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="bubbles"></div>

      <AppBar position="static" className="nav">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">User Directory</Typography>

          <IconButton
            color="inherit"
            onClick={() => setDarkMode(!darkMode)}
            className="themeToggle"
          >
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
          className="searchBox"
        />

        {/* Sorting Dropdown */}
        <div style={{ marginTop: "15px", textAlign: "right" }}>
          <select onChange={handleSort} className="sortDropdown">
            <option value="">Sort</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>

        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card className="userCard">
                <CardContent>
                  <Avatar
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
                    className="avatar"
                  />

                  <Typography variant="h6" className="username">
                    {user.name}
                  </Typography>

                  <Typography>{user.email}</Typography>
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