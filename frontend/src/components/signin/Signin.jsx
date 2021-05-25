import React from "react";
import "./_signin.scss";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

const Signin = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.table(data);
    if (data.password === data.repeatPassword) {
      const BODY = {
        userName: data.username,
        password: data.password,
      };
      const request = await fetch("/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BODY),
      });
      if (request.status == 200) {
        return props.history.push("/login");
      } else {
        alert("Error while creating your user");
      }
    } else {
      alert("Passwrods doesn't match");
    }
  };

  return (
    <div className="signin">
      <div className="container">
        <h1>SignIn</h1>
        <form className="form" action="" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              {...register("username", { required: true })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              {...register("repeatPassword", { required: true })}
              placeholder="Repeat password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign in
          </Button>
          {/* <div className="form-control">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            name="username"
            id="username"
            {...register("username", { required: true })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="repeat-password">Repeat password</label>
          <input
            type="password"
            name="repeat-password"
            id="repeat-password"
            {...register("repeatPassword", { required: true })}
          />
        </div> */}
          {/* <button type="submit">Submit</button> */}
        </form>
      </div>
    </div>
  );
};

export default Signin;
