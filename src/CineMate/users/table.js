import React, { useState, useEffect } from "react";
import {
  BsPencil,
  BsFillCheckCircleFill,
  BsTrash3Fill,
  BsPlusCircleFill,
} from "react-icons/bs";
import * as client from "./client";
import { Link } from "react-router-dom";
import CineMateNavigation from "../CineMateNavigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import TablePagination from '@mui/material/TablePagination';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <CineMateNavigation />
      <div className="container">
        <span className="pageTitle">User List</span>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username & Password</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "220px",
                  }}
                >
                  {" "}
                  {/* Adjust maxWidth as needed */}
                  <TextField
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    size="small"
                    fullWidth
                  />
                  <TextField
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    size="small"
                    fullWidth
                  />
                </div>
              </TableCell>
              {/* <TableCell>
                    <TextField
                      value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      size="small"
                      fullWidth
                    />
                  </TableCell> */}
              <TableCell>
                <TextField
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  fullWidth
                >
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              </TableCell>
              <TableCell className="text-nowrap">
                <IconButton onClick={updateUser} color="success">
                  <BsFillCheckCircleFill />
                </IconButton>
                {/* <IconButton onClick={createUser} color="primary">
                  <BsPlusCircleFill />
                </IconButton> */}
              </TableCell>
            </TableRow>
            {users.map((u) => (
              <TableRow key={u._id}>
                {/* <TableCell><Link to={`/CineMate/Profile/${u._id}`}>{u.username}</Link></TableCell> */}
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.firstName}</TableCell>
                <TableCell>{u.lastName}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell className="text-nowrap">
                  <IconButton onClick={() => selectUser(u)} color="warning">
                    <BsPencil />
                  </IconButton>
                  <IconButton onClick={() => deleteUser(u)} color="error">
                    <BsTrash3Fill />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
        {users
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((u) => {
            // ... TableRow mapping
          })}
      </TableBody>
        </Table>
        <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={users.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
      </div>
    </div>
  );
}

export default UserTable;
