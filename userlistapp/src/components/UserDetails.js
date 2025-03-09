import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const logoImg = [
    "https://i.pinimg.com/736x/3b/92/35/3b9235b902cab472f8a8137debb5a27e.jpg",
    "https://images-platform.99static.com//zA0n0YWqsSEq4b7S1wRKZWw1QU0=/0x271:2274x2545/fit-in/500x500/projects-files/113/11307/1130735/6d7f887d-54a1-451b-9b23-23edc9bd9b2e.png",
    "https://static.vecteezy.com/system/resources/previews/048/394/836/non_2x/a-cartoon-chicken-mascot-logo-illustration-vector.jpg"
  ];

  // Fetch User Data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const foundUser = data.find(user => user.username === username);
        setUser(foundUser);
      })
      .catch(error => console.log('Error:', error));
  }, [username]);

  const getProfileImage = (id) => {
    return logoImg[id % logoImg.length];
  }

  return (
    <div className="container">
      {user ? (
        <div className="usercard">
          <div className="user-header">
            <img
              src={getProfileImage(user.id)}
              alt="User Profile"
              className="user-image"
            />
            <h2 className="card-title">{user.username}</h2>
          </div>

          <p className="user-bio">
            Hi, my name is <strong>{user.name}</strong>. I am currently working at <strong>{user.company.name}</strong>.
            You can reach me at <strong>{user.email}</strong> or call me directly at <strong>{user.phone}</strong>.
            My office is located in <strong>{user.address.city}</strong>.
            For more details about my work or projects, you can visit my website at
            <a href={`https://${user.website}`} target="_blank" rel="noreferrer"> {user.website}</a>.
            I’m always open to new opportunities and collaborations. Feel free to connect anytime!
          </p>

          <Link to="/" className="button">
            🔙 
          </Link>
        </div>
      ) : (
        <h2>User Not Found</h2>
      )}
    </div>
  );
}

export default UserDetails;
