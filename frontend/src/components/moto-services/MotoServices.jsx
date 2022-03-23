import React, { useState, useEffect } from "react";
import "./_moto-services.scss";
import Service from "./serviceRow/Service";

import { Button } from "react-bootstrap";
import { isExpired, decodeToken } from "react-jwt";

const MotoServices = (props) => {
  const [available, setAvailable] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  let availableServices;
  useEffect(async () => {
    const currentToken = await localStorage.getItem("token");
    const decodedToken = await decodeToken(currentToken);
    setCurrentUser(decodedToken.id);
    fetch(`/motorcyclist/`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => resp.json())
      .then((services) => {
        if (services.length === 0) {
          fetch(`/motorcyclist/`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((resp) => {
              console.log(resp);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("ALREADY EXISTS");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const getServices = () => {};

  const logout = () => {
    localStorage.setItem("token", null);
    return props.history.push("/");
  };

  const doRows = () => {
    let rows = [];
    for (let i = 8; i <= 16; i++) {
      rows.push(
        `${
          i < 12
            ? i === 9
              ? `0${i}:00 ${i + 1}:00 AM`
              : i < 10
              ? `0${i}:00 0${i + 1}:00 AM`
              : `${i}:00 ${i + 1}:00 AM`
            : i === 12
            ? `${i}:00 0${i - 11}:00 PM`
            : `0${i - 12}:00 0${i - 11}:00 PM`
        }`
      );
    }
    return rows;
  };
  return (
    <div className="moto-services">
      <section className="conventions">
        <div className="item">
          <div className="circle appointment-free"></div>
          <p className="text">Free </p>
        </div>
        <div className="item">
          <div className="circle appointment-taken"></div>
          <p className="text">Busy </p>
        </div>
        <div className="item">
          <div className="circle appointment-mine"></div>
          <p className="text">Mine</p>
        </div>
      </section>
      <div className="servicesContainer">
        <Button onClick={logout} className="logoutBtn">
          Logout
        </Button>
        {doRows().map((hour) => (
          <Service
            key={hour}
            hour={hour}
            selectedBy={""}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default MotoServices;
