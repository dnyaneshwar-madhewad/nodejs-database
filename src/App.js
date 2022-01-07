import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <>
      <MyComponent />
    </>
  );
}

function MyComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [list, setList] = useState([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const addUser = async () => {
    const url = "http://localhost:4000/add-user";
    const data = {
      username: username,
      password: password,
    };

    // AJAX using AXIOS
    await axios.post(url, data);

    const newList = [data, ...list];
    setList(newList);

    setUsername("");
    setPassword("");
  };

  const getUser1 = async () => {
    const url = "http://localhost:4000/users";
    const result = await axios.get(url);

    const list = result.data;
    const newList = [...list];
    setList(newList);
  };

  const getUser = async () => {
    const url = "http://localhost:4000/users";
    const result = await fetch(url);
    const list = await result.json();

    const newList = [...list];
    setList(newList);
  };

  // Spe Function::  Like Constructor :: React Hooks
  useEffect(() => getUser(), []);

  return (
    <div>
      <h1>User Registration</h1>
      <div>
        <input
          type="text"
          name=""
          id=""
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter Username"
        />
      </div>
      <div>
        <input
          type="text"
          name=""
          id=""
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
        />
      </div>
      <div>
        <input type="button" name="" value="Register" onClick={addUser} />
        <input type="button" name="" value="Get User" onClick={getUser} />
      </div>

      <h1>User List</h1>

      {list.map((item, index) => (
        <div key={index}>
          {item.username} {item.password}
        </div>
      ))}
    </div>
  );
}