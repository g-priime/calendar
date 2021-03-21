import React from "react";
import Calendar from "./Calendar";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const history = useHistory();
    const { logout } = useAuth();

  async function handleLogout() {
    //closeMobileMenu();
    //setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      //setError("Failed to log out");
    }
  }

  return (
    <div>
      <Button onClick={handleLogout}>Log Out</Button>
      <Calendar />
    </div>
  );
}