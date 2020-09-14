import React from 'react';
import Navigation from '../components/Navigation';
import AddPosition from '../components/AddPosition';
import PositionCard from '../components/PositionCard';

const Home = ({positions, setPositions, user, setUser}) => {

    return (
        <React.Fragment>
            <Navigation user={user} setUser={setUser}/>
            <div className="container" style={{marginTop: '25px'}}>
                {positions && positions.map(position => (
                    <div key={position._id} style={{marginBottom: '15px'}}>
                        <PositionCard position={position}/>
                    </div>
                ))}
            <AddPosition setPositions={setPositions} />
            </div>
        </React.Fragment>
    );
}

export default Home;