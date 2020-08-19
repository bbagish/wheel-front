import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NewPositionDialog from '../components/NewPositionDialog'
const Home = () => {

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/positions")
            .then(res => res.json())
            .then(res => {
                setPositions(res);
            })
    }, []);

    return (
        <React.Fragment>
            {positions && positions.map(position => (
                <ul>
                    <Link to={`/positions/${position._id}`}>{position.symbol}</Link>
                </ul>
            ))}
            <NewPositionDialog/>
        </React.Fragment>
    );
}

export default Home;
