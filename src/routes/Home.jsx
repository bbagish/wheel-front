import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NewPositionDialog from '../components/NewPositionDialog';
import Navigation from '../components/Navigation';
import { getPositions } from '../services/positionService';

const Home = () => {

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        (async () => {
            const { data: positions } = await getPositions();
            setPositions(positions);
        })();
    }, []);

    return (
        <React.Fragment>
            <Navigation />
            <ul>
                {positions && positions.map(position => (
                    <div key={position._id}>
                        <Link key={position._id} to={`/positions/${position._id}`}>{position.symbol}</Link>
                    </div>
                ))}
            </ul>
            <NewPositionDialog setPositions={setPositions} />
        </React.Fragment>
    );
}

export default Home;