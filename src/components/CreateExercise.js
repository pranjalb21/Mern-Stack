import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateExercise = () => {
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
      await axios.get("http://localhost:5000/users").then((res) => {
        if (res.data.length > 0)
          setExercise({
            users: res.data.map((user) => user.username),
            username: res.data[0].username,
          });
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

    console.log(newExercise);

    axios
      .post("http://localhost:5000/exercises/add", newExercise)
      .then((res) => console.log(res.data));

    navigate("/");
  };
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={exercise.username}
            onChange={onChangeUserName}
          >
            {exercise.users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
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
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
