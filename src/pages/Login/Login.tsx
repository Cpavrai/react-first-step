import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import APIService from "../../services/ApiService";
import "./Login.scss";

const login = (
  event: FormEvent,
  username: string,
  password: string,
  navigate: Function
) => {
  event.preventDefault();
  APIService.login(username, password)
    .then((_) => navigate("/discover"))
    .catch((err) => alert(err));
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <Modal center={true}>
      <section id="login" className="bg-white">
        <h2>Connexion</h2>
        <form onSubmit={(event) => login(event, username, password, navigate)}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input type="submit" value="Confirmer" />
        </form>
      </section>
    </Modal>
  );
};

export default Login;
