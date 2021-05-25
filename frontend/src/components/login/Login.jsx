import React from "react";
import "./_login.scss";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { Route } from "react-router-dom";
import MotoServices from "../moto-services/MotoServices";

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const BODY = {
      userName: data.username,
      password: data.password,
    };
    // Tha async await way
    try {
      const request = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BODY),
      });

      //   const resp = request

      if (request.status === 200) {
        const token = await request.json();
        console.log(token.token);
        console.log(request);
        localStorage.setItem("token", token.token);
        return props.history.push("/services");
      } else {
        alert("Incorrect userName or password ");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="login">
      <div className="container">
      <h1>LogIn</h1>
        <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="form-control">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            {...register("username", { required: true })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: true })}
          />
        </div> */}
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              placeholder="User name"
              type="text"
              // id="username"
              name="username"
              {...register("username", { required: true })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              placeholder="Pasword"
              type="password"
              name="password"
              // id="password"
              {...register("password", { required: true })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log in
          </Button>
          {/* <input type="submit" value="LogIn" /> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
