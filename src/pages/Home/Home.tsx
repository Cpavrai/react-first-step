import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import "./Home.scss";

const Home = () => (
  <div>
    <Modal center={true}>
      <p id="home-text">
        Bienvenue sur <b>Data Galaxy</b> !
      </p>
      <Button value="Commencer" color="blue" link="discover" />
    </Modal>
  </div>
);

export default Home;
