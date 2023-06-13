import axios from "axios";
import { useEffect, useState } from "react";
import { Exercise } from "./Exercise";

export const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const val=1

  useEffect(() => {
    async function fetchData() {
      await axios.get("http://localhost:5000/exercises/")
        .then(res => setExercises(res.data))
    }
    fetchData();
  }, [val]);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));
    setExercises(exercises.filter((exercise) => exercise._id !== id));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return (
              <Exercise
                exercise={exercise}
                deleteExercise={deleteExercise}
                key={exercise._id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
