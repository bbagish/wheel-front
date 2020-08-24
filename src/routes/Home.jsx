import React from 'react';
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation';
import NewPositionDialog from '../components/NewPositionDialog';
import PositionCard from '../components/PositionCard';

const Home = ({positions, setPositions}) => {

    return (
        <React.Fragment>
            <Navigation />
            <div className="container">
            <ul>
                {positions && positions.map(position => (
                    <div key={position._id}>
                        <Link key={position._id} to={`/positions/${position._id}`}>{position.symbol}</Link>
                    </div>
                ))}
            </ul>
            <PositionCard />

            <NewPositionDialog setPositions={setPositions} />
            </div>
        </React.Fragment>
    );
}

export default Home;