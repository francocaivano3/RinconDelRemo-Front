import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from "../../service/authContext/AuthContext";

import { useContext, useRef, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

//   const { handleLogin } = useContext(AuthContext);
  let userData = {}

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.length === 0) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      return;
    }

    if (password.length === 0) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      return;
    }

    try {
      userData = {
        userName: email,
        password: password,
      };
      const response = await fetch(
        "https://localhost:7099/api/authentication/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        alert("Error en el inicio de sesion, no hay respuesta");
        console.log("Error en el inicio de sesion");
        throw new Error("Error en el inicio de sesion");
      }

      const data = await response.text();

      handleLogin(email, data)
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  return (
    <div className='login-container' style={{ display: "flex", width: "100%", paddingTop: "5em", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "20px", width: "100%", height: "100vh" }}>
      <Form data-bs-theme="dark" style={{ maxWidth: "800px", margin: "auto" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control placeholder="Enter email" onChange={emailHandler} ref={emailRef}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={passwordHandler} ref={passwordRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out"/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Enviar
        </Button>
        {(errors.email || errors.password) && (
              <p className="mt-4 text-center text-danger">
                Se
              </p>
            )}
      </Form>
    </div>
  );
}

export default Login;