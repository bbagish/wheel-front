import React from 'react';
import Navigation from '../components/Navigation';
import NewPositionDialog from '../components/NewPositionDialog';
import PositionCard from '../components/PositionCard';

const Home = ({positions, setPositions, user, setUser}) => {

    return (
        <React.Fragment>
            <Navigation user={user} setUser={setUser}/>
            <div className="container" style={{marginTop: '25px'}}>
                {positions && positions.map(position => (
                    <div key={position._id} style={{marginBottom: '15px'}}>
                        {/* <Link key={position._id} to={`/positions/${position._id}`}>{position.symbol}</Link> */}
                        <PositionCard position={position}/>
                    </div>
                ))}
            <NewPositionDialog setPositions={setPositions} />
            </div>
        </React.Fragment>
    );
}

export default Home;