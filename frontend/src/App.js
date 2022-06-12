import './App.css';
import Web3Wrapper from './web3/wrapper/Web3Wrapper';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import ProjectList from './pages/ProjectList';
import { TransactionButton, ConnectButton } from './web3/components';

import 'bootstrap/dist/css/bootstrap.min.css';
import MyProjects from './pages/MyProjects';
import Access from './pages/Access';

const wrapperConfig = {
  infura: '',
  network: 4,
  rpc: 'https://rinkeby.infura.io/v3/09bab57197a241c0a3f998bb0d80691b',
  blockexplorer: {
    url: 'https://rinkeby.etherscan.io/',
    name: 'etherscan'
  },
}


function App() {
  return (
    <div className="App">

      <Web3Wrapper config={wrapperConfig}>
        <Navbar>
          <Container>
            <Navbar.Brand href="/">Neighborhodli</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="create">Create Project</Nav.Link>
              <Nav.Link href="/">Project List</Nav.Link>
              <Nav.Link href="my">My Projects</Nav.Link>
              <Nav.Link href="my">Mint Access Token</Nav.Link>
              <Nav.Link target="_blank" href="https://www.tally.xyz/governance/eip155:4:0x06FCB3Efe8BA39B331D00C4AC245ed2521D79e0e">Vote</Nav.Link>
            </Nav>
            <ConnectButton language='en'/>
          </Container>
        </Navbar>
        <Router>
          <Switch>

            <Route exact path='/create'>
              <CreateProject />
            </Route>
            <Route exact path='/'>
              <ProjectList />
            </Route>            
            
            <Route exact path='/my'>
              <MyProjects />
            </Route>

            <Route exact path='/access'>
              <Access />
            </Route>

            

          </Switch>
        </Router>
      </Web3Wrapper>
    </div>
  );
}

export default App;
