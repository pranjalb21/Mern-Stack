import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const CreateUser = () => {
  const [user, setUser] = useState({
    username: "",
  });

  const navigate = useNavigate();

  const onChangeUserName = (e) =>
    setUser({
      ...user,
      username: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: user.username,
    };

    console.log(newUser);

    axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data))

        
    setUser({
      username: "",
    });
    navigate('/');
  };
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            value={user.username}
            onChange={onChangeUserName}
          />
        </div>
        <div className="form-group" style={{ marginTop: "10px" }}>
          <input
            type="submit"
            value="Create New User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
