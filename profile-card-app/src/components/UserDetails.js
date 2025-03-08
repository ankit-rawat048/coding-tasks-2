import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Styles.css';

const UserDetails = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        navigate('/profile', {state: {name, age, bio}});

    };


    return (
        <div className="container">
            <h1>Fill Your Details</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label><br />
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Age:</label><br />
                    <input
                        type="number"
                        placeholder="Enter your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div>
                    <label>Bio:</label><br />
                    <textarea
                        rows="4"
                        placeholder="Write about yourself"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UserDetails;