import { NavLink } from "react-router-dom";
import Button from "../UI/Button";
import { useState } from "react";
import UpcomingSessions from "../Sessions/UpcomingSessions";

export default function MainHeader() {
  const [upcomingSessionModal, setUpcomginSessionModal] = useState(false);

  function handleOpenUpcomingSessionModal() {
    setUpcomginSessionModal(true);
  }

  function handleCloseUpcomingSessionModal() {
    setUpcomginSessionModal(false);
  }

  return (
    <header id="main-header">
      {upcomingSessionModal && (
        <UpcomingSessions
          onClose={handleCloseUpcomingSessionModal}
        ></UpcomingSessions>
      )}
      <h1>ReactMentoring</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to=""
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Our Mission
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sessions"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Browse Sessions
            </NavLink>
          </li>
          <li>
            <Button onClick={handleOpenUpcomingSessionModal}>
              Upcoming Sessions
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
