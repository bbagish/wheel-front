import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NewPositionDialog from '../components/NewPositionDialog';
import Navigation from '../components/Navigation';

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
            <Navigation />

            <ul>
                {positions && positions.map(position => (
                    <div>
                        <Link key={position._id} to={`/positions/${position._id}`}>{position.symbol}</Link>
                    </div>
                ))}
            </ul>

            <NewPositionDialog/>
        </React.Fragment>
    );
}

export default Home;
