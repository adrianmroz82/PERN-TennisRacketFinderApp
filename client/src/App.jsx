import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RacketDetail from './routes/RacketDetail';
import Home from './routes/Home';
import UpdateRacket from './routes/UpdateRacket';
import { RacketsContextProvider } from './context/RacketContext';

const App = () => {
  return (
    <RacketsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rackets/:id/update" component={UpdateRacket} />
            <Route exact path="/rackets/:id" component={RacketDetail} />
          </Switch>
        </Router>
      </div>
    </RacketsContextProvider>
  );
};
export default App;

// Switch -> after path mathes route, react stops to search for different routes
// prevents to load multiple components
