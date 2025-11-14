import LuggageWrappingHomePage from './LuggageWrappingHomePage';
import AirportServices from './AirportServices';

const Homepage = () => {
  return (
    <div className=''>
      <AirportServices />
      <LuggageWrappingHomePage />
      {/* <AirportPickup /> */}
    </div>
  );
};

export default Homepage;
