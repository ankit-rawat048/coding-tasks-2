import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserList() {
    const logoImg = [
        "https://i.pinimg.com/736x/3b/92/35/3b9235b902cab472f8a8137debb5a27e.jpg",
        "https://images-platform.99static.com//zA0n0YWqsSEq4b7S1wRKZWw1QU0=/0x271:2274x2545/fit-in/500x500/projects-files/113/11307/1130735/6d7f887d-54a1-451b-9b23-23edc9bd9b2e.png",
        "https://static.vecteezy.com/system/resources/previews/048/394/836/non_2x/a-cartoon-chicken-mascot-logo-illustration-vector.jpg",
        "https://bcassetcdn.com/public/blog/wp-content/uploads/2023/02/15175259/cheeky-cartoon-man-by-novita007-brandcrowd.png",
        "https://t4.ftcdn.net/jpg/06/29/23/63/360_F_629236341_wAj7Sg5GiOiaKcFB8jdV5MSyTO0kkmzk.jpg",
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/171064671/original/97717252e440f3ca6398735363319c80a436e91e/do-any-kind-of-simple-logo-design.jpg",
        "https://bcassetcdn.com/public/blog/wp-content/uploads/2023/02/15175239/4144-cool-boy-by-gustavo-zambelli-dribbble.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQKZlPZBg5_zO6GEbNDjcUdBljP4Ca0zqeg&s",
        "https://cdn.dribbble.com/userupload/14112939/file/original-f80eef2e69697761a372d30320d5a9d9.png?resize=400x0",
    ]

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.log('Error:', error));
    }, []);

    const getProfileImage = (id) => {
        return logoImg[id % logoImg.length];
    }

    return (
        <div className="container">
            <h1 className="text-center">Users</h1>
            <div className="user-grid">
                {users.map(user => (
                    <div className="card" key={user.id}>
                        <Link to={`/user/${user.username}`} className="user-link">
                            <img 
                                src={getProfileImage(user.id)} 
                                alt={user.name} 
                                className="user-image"
                            />
                            <h2 className="card-title">{user.username}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
