import './App.css';
import Web3Wrapper from './web3/wrapper/Web3Wrapper';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Index from './pages/Index';

const wrapperConfig = {
  network: 137,
  rpc: 'https://polygon-mainnet.g.alchemy.com/v2/HH-qU-iwvntnlUaqXO91YSqWmlLIGpRS',
  blockexplorer: {
    url: 'https://polygonscan.com',
    name: 'polygonscan'
  },
}


function App() {
  return (
    <div className="App">
      <Web3Wrapper config={wrapperConfig}>
        <Router>
          <Switch>
            <Route path='/'>
              <Index />
            </Route>

          </Switch>
        </Router>
      </Web3Wrapper>
    </div>
  );
}

export default App;
