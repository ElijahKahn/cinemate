// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import CineMateNavigation from "../CineMateNavigation";
import * as client from "../users/client";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    console.log("user", user);
    setAccount(user);
  };

  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    try{
    const account = await client.account();
    console.log("account", account);
    setAccount(account);
    } catch (error) {
        console.error("error fetching", error);
    }
  };

  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);

  const save = async () => {
    await client.updateUser(account);
    
  };

  const signout = async () => {
    await client.signout();
    navigate("/CineMate/SignIn");
  };

  return (
    <>
      <CineMateNavigation />
      <span className="pageTitle">PROFILE</span>
      <div className="contianer">
        <div>
          {account && (
            <div>
              <input
                className="form-control"
                value={account.password}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    password: e.target.value,
                  })
                }
              />
              <input
                className="form-control"
                value={account.firstName}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    firstName: e.target.value,
                  })
                }
              />
              <input
                className="form-control"
                value={account.lastName}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    lastName: e.target.value,
                  })
                }
              />
              <input
                className="form-date-input"
                value={account.dob}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    dob: e.target.value,
                  })
                }
              />
              <input
                className="form-control"
                value={account.email}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    email: e.target.value,
                  })
                }
              />
              <select
                className="form-select"
                onChange={(e) =>
                  setAccount({
                    ...account,
                    role: e.target.value,
                  })
                }
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              <button className="btn btn-primary w-100" onClick={save}>
                Save
              </button>
              <button className="btn btn-danger w-100" onClick={signout}>
                Signout
              </button>

              <Link to="/Kanbas/admin/users" className="btn btn-warning w-100">
                Users
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Profile;
