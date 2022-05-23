import Header from './components/Header';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import OwnersContainer from './containers/OwnersContainer';
import OwnerContainer from './containers/OwnerContainer';
import CarsContainer from './containers/CarsContainer';
import CarContainer from './containers/CarContainer';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header></Header>
      <Switch>
        <Container>
          {/* <Route exact path='/owners/:ownerid' component={OwnerContainer} /> */}
          <Route exact path='/owners/new' component={OwnerContainer} />
          <Route exact path='/owners' component={OwnersContainer} />
          <Route exact path='/cars/:carId' component={CarContainer} />
          <Route exact path='/cars' component={CarsContainer} />
          <Route exact path='/'>
            <Redirect to={`owners`} />
          </Route>
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
