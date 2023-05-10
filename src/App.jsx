import { useEffect, useState } from "react";
import './App.css';


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = event => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email };

    // console.log(name, email);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      });
  }

  return (
    <>
      <h1>User Management System</h1>
      <h3>Numbers Of Users: {users.length}</h3>

      {/* New User Creation Form */}
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Enter Name..." />
        <br />
        <input type="email" name="email" placeholder="Enter Email..." />
        <br />
        <input type="submit" value="Add User" />
      </form>

      {
        users.map(user => <p
          key={user.id}
        >
          {user.id} : {user.name} : {user.email}
        </p>)
      }
    </>
  )
}

export default App
