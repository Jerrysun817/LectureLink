import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import styles from "./LoginPage.module.css";
import { auth } from "../../firebase/config.js";

export const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(auth?.currentUser?.email);
  console.log(auth.currentUser);

  const registerUser = async (data) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [isRegister, setIsRegister] = useState(false);

  const handleSignIn = async (data) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("logged out");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      {isRegister ? (
        <Container className="">
          <Row className="vh-100 d-flex justify-content-center">
            <Col md={8} lg={6} xs={12}>
              <div className="border border-3"></div>
              <Card className="shadow">
                <Card.Body>
                  <h1 className="text-center">Register</h1>
                  <div className="mb-3 mt-4">
                    <Form onSubmit={handleSubmit(registerUser)}>
                      <Form.Group className="mb-3" size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          autoFocus
                          placeholder="Enter email"
                          type="email"
                          name="email"
                          {...register("email")}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        size="lg"
                        controlId="password"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          autoFocus
                          type="text"
                          placeholder="Enter password"
                          name="password"
                          {...register("password")}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          size="lg"
                          type="submit"
                          className="bg-slate-500 text-[20px] py-2 rounded-lg text-white hover:bg-slate-400"
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                    <p className="mb-0  text-center">
                      Already have an account?{" "}
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          reset();
                          setIsRegister(false);
                        }}
                        className={`fw-bold text-sky-400 hover:text-sky ${styles.cursorPointer}`}
                      >
                        Sign In
                      </a>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="">
          <Row className="vh-100 d-flex justify-content-center">
            <Col md={8} lg={6} xs={12}>
              <div className="border border-3"></div>
              <Card className="shadow">
                <Card.Body>
                  <h1 className="text-center">Login</h1>
                  <div className="mb-3 mt-4">
                    <Form onSubmit={handleSubmit(handleSignIn)}>
                      <Form.Group className="mb-3" size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          autoFocus
                          placeholder="Enter email"
                          type="email"
                          name="email"
                          {...register("email")}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        size="lg"
                        controlId="password"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          autoFocus
                          type="text"
                          placeholder="Enter password"
                          name="password"
                          {...register("password")}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          size="lg"
                          type="submit"
                          className="bg-slate-500 text-[20px] py-2 rounded-lg text-white hover:bg-slate-400"
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          reset();
                          setIsRegister(true);
                        }}
                        className={`fw-bold text-sky-400 hover:text-sky ${styles.cursorPointer}`}
                      >
                        Sign Up
                      </a>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      <Button
        onClick={() => {
          handleSignOut();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};
