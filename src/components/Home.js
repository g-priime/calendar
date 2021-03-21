import React from "react";
import Calendar from "./Calendar";
import { useAuth } from "../contexts/AuthContext";

import NavBar from "./Nav-bar";

export default function Home() {

  const { currentUser } = useAuth();

  return (
    <div>
      <NavBar currentUser={currentUser} />   
      <Calendar currentUser={currentUser} />
    </div>
  );
}
