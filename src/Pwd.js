import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

const Pwd = () => {
  const [adminPassword, setAdminPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // TODO: make a POST request to the backend to change the password
    const res = await axios.post("https://radar.cfsg.com.hk/api/v1/changepwd", {
      adminpwd: adminPassword,
      key: "hashedpwd",
      value: hashedPassword,
    });

    // handle the response accordingly
    if (res.data === "Value set successfully") {
      alert("Password changed successfully");
    } else {
      alert("Failed to change password");
    }
  };

  return (
    <div>
      <input
        type="password"
        placeholder="Enter admin password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default Pwd;
