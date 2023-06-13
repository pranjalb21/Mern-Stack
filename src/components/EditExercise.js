import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const EditExercise = () => {
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get("http://localhost:5000/exercises/" + id);
      setExercise({
        username: res.data.username,
        description: res.data.description,
        duration: res.data.duration,
        date: new Date(res.data.date),
      });
    }
    fetchData();
  }, []);

  const onChangeDescription = (e) =>
    setExercise({
      ...exercise,
      description: e.target.value,
    });

  const onChangeDuration = (e) =>
    setExercise({
      ...exercise,
      duration: e.target.value,
    });

  const onChangeDate = (newDate) =>
    setExercise({
      ...exercise,
      date: newDate,
    });

  const onChangeUserName = (e) =>
    setExercise({
      ...exercise,
      username: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    const newExercise = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };

    axios
      .post("http://localhost:5000/exercises/update/" + id, newExercise)
      .then((res) => console.log(res.data));

    navigate("/");
  };
  return (
    <div>
      <h3>Update Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={exercise.username}
            onChange={onChangeUserName}
          >
            <option value={exercise.username}>{exercise.username}</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (In minutes): </label>
          <input
            type="text"
            className="form-control"
            value={exercise.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={exercise.date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group" style={{ marginTop: "10px" }}>
          <input
            type="submit"
            value="Update Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
