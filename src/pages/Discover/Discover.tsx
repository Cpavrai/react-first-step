import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import APIService from "../../services/ApiService";
import "./Discover.scss";

const fetchData = (setData: Function, date: string) => {
  APIService.fetchData(date)
    .then((data) => setData(data))
    .catch((err) => {
      console.error(err);
      alert("An error occured");
    });
};

const goToNextDate = (date: string, setDate: Function, progress: number) => {
  let tmp = new Date(date);
  tmp.setDate(tmp.getDate() + progress);
  setDate(tmp.toJSON().slice(0, 10));
};

const Discover = () => {
  const [data, setData] = useState({
    title: "Loading",
    url: "https://i0.wp.com/datascientest.com/wp-content/uploads/2022/03/logo-2021-1.png?w=429&ssl=1",
    explanation: "Loading…",
  });
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));

  useEffect(() => {
    fetchData(setData, date);
  }, []);
  return (
    <section id="data-section">
      <h2>
        {date} : {data.title}
      </h2>
      <img src={data.url} alt="this day NASA" />
      <p>{data.explanation}</p>
      <div>
        <Button
          value="< Previous"
          color="purple"
          clickFunction={() => goToNextDate(date, setDate, -1)}
        />
         
        {date === new Date().toJSON().slice(0, 10) ? null : (
          <Button
            value="Next >"
            color="purple"
            clickFunction={() => goToNextDate(date, setDate, 1)}
          />
        )}
      </div>
    </section>
  );
};

export default Discover;
