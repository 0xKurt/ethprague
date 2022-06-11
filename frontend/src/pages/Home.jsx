import React, { useEffect, useState } from 'react';
import { Form, Stack, Button, Accordion, Row, Col } from 'react-bootstrap';
import { useCallContract, useConnectedAccount, useConnectedWeb3, useErc20BalanceOf, useEthBalanceOf } from '../web3/hooks';
import Token from '../data/contracts/Token.json'
import { fromWeiToFixed, toWei } from '../web3/utils/func';
import { TransactionButton, ConnectButton } from '../web3/components';
<<<<<<< Updated upstream
let regex = /^(?:[0-9]\d+|\d)(?:\.\d{0,2})?$/;
=======
import { create } from 'ipfs-http-client';
>>>>>>> Stashed changes

const Home = () => {
  const { account, } = useConnectedAccount();
  const tokenUser = useErc20BalanceOf(Token.address, account, 2); // exchange token address
  const [errorMessage, setErrorMessage] = useState('')
  const [inputValue, setInputValue] = useState("");
  const [inputAddress, setInputAddress] = useState('')
  const [owner, setOwner] = useState("");
  const [minter, setMinter] = useState('')
  const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  // const { web3, }  = useConnectedWeb3()

  const onChangeHandler = (e) => {
    let newValue = e.target.value;

    if (e.target.value.includes(',')) {
      newValue = e.target.value.replace(',', '.');
    }
    if (regex.test(newValue) && newValue > 0.00) {
      setErrorMessage('')
    } else {
      setErrorMessage('Eingabefehler');
    }
    if (newValue == '') setErrorMessage('')
    setInputValue(newValue);
  }

  const onChangeOwner = (e) => {
    let newValue = e.target.value;
    setOwner(newValue);
  }

  const onChangeMinter = (e) => {
    let newValue = e.target.value;
    setMinter(newValue);
  }

  const onChangeAddress = (e) => {
    let newValue = e.target.value;

    setInputAddress(newValue);
  }

  return (
    <div className="col-md-5 mx-auto">
      <h3>Welcome to our Project</h3>
      
      <br/>
      <hr />
      

    </div>
    )
    
}

export default Home;