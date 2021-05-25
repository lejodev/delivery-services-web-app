import React, { useState, useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import "./_service.scss";

const Service = (props) => {
  const [takenByMe, setTakenByMe] = useState(false);
  const [taken, setTaken] = useState(false);
  const [canSelect, setCanSelect] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const hour = props.hour.split(":")[0];

  var currentUser;
  useEffect(async () => {
    console.log("props.availability", props.availability);
    const decodedToken = await decodeToken(localStorage.getItem("token"));
    currentUser = decodedToken.id;
    fetch(`/motorcyclist/serviceStatus/${hour}`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.length > 0) {
          if (resp[0].takenBy == currentUser) {
            setTaken(true);
            setTakenByMe(true);
            setCanSelect(true);
            setCurrentServiceId(resp[0]._id);
          } else {
            setTaken(true);
            setTakenByMe(false);
            setCanSelect(false);
          }
          console.log(resp[0].takenBy == currentUser);
        } else {
          setTaken(false);
          setTakenByMe(false);
          setCanSelect(true);
        }
      });
  }, []);

  const handleClick = async () => {
    if (canSelect) {
      console.log(canSelect);
      const serviceId = await (async () => {
        if (takenByMe) {
          console.log("currentServiceIdasasasasas", currentServiceId);
          console.log(currentServiceId);
          setTaken(false);
          setTakenByMe(false);
          setCanSelect(true);
          const BODY = {
            userId: await props.currentUser,
            rowKey: hour,
          };
          const selectAvailableService = await fetch(
            `/motorcyclist/${currentServiceId}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
                Authorization: `bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(BODY),
            }
          );
          const result = await selectAvailableService.json();
        } else {
          const availableServiceRequest = await fetch(
            "/motorcyclist/select",
            {
              headers: {
                Authorization: `bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (availableServiceRequest.status == 200) {
            const serviceId = await availableServiceRequest.json();
            console.log("serviceId", serviceId.id);
            const BODY = {
              userId: await props.currentUser,
              rowKey: hour,
            };
            const selectAvailableService = await fetch(
              `/motorcyclist/${serviceId.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(BODY),
              }
            );
            const result = await selectAvailableService.json();
            console.log(result);
            console.log(result.id);
            setCurrentServiceId(serviceId.id);
            setTaken(true);
            setTakenByMe(true);
          } else {
            alert("No available services");
          }
        }
      })();
    } else {
      alert("You can't select this service");
    }
  };

  return (
    <div
      className={`row ${taken ? (takenByMe ? "takenByMe" : "taken") : "service"}`}
      onClick={handleClick}
    >
      <div>{props.hour}</div>
    </div>
  );
};

export default Service;
