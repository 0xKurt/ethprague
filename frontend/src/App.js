import './App.css';
import Web3Wrapper from './web3/wrapper/Web3Wrapper';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import ProjectList from './pages/ProjectList';
import { TransactionButton, ConnectButton } from './web3/components';

import 'bootstrap/dist/css/bootstrap.min.css';

const wrapperConfig = {
  infura: '',
  network: 80001,
  rpc: 'https://polygon-mumbai.g.alchemy.com/v2/0NNPYrUw2G92VSsJG-bezGptnY5g4Dlt',
  blockexplorer: {
    url: 'https://mumbai.polygonscan.com/',
    name: 'mumbaiscan'
  },
}


function App() {
  return (
    <div className="App">

      <Web3Wrapper config={wrapperConfig}>
        <Navbar>
          <Container>
            <Navbar.Brand href="home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="home">Home</Nav.Link>
              <Nav.Link href="create">Create Project</Nav.Link>
              <Nav.Link href="list">Project List</Nav.Link>
            </Nav>
            <ConnectButton language='en'/>
          </Container>
        </Navbar>
        <Router>
          <Switch>

            <Route exact path='/home'>
              <Home />
            </Route>
            <Route exact path='/create'>
              <CreateProject />
            </Route>
            <Route exact path='/list'>
              <ProjectList />
            </Route>

          </Switch>
        </Router>
      </Web3Wrapper>
    </div>
  );
}

export default App;
