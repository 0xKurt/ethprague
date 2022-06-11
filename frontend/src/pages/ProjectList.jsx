import React, { useEffect, useState } from 'react';
import { Form, Stack, Button, Accordion, Row, Col } from 'react-bootstrap';
import { useCallContract, useConnectedAccount, useConnectedWeb3, useErc20BalanceOf, useEthBalanceOf } from '../web3/hooks';
import Token from '../data/contracts/Token.json'
import { fromWeiToFixed, toWei } from '../web3/utils/func';
import { TransactionButton, ConnectButton } from '../web3/components';
let regex = /^(?:[0-9]\d+|\d)(?:\.\d{0,2})?$/;

const ProjectList = () => {
  const { account, } = useConnectedAccount();
  const tokenUser = useErc20BalanceOf(Token.address, account, 2); // exchange token address
  const [errorMessage, setErrorMessage] = useState('')
  const [inputValue, setInputValue] = useState("");
  const [inputAddress, setInputAddress] = useState('')
  const [owner, setOwner] = useState("");
  const [minter, setMinter] = useState('')
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
        <h3>Project List</h3>
        <h3>Projectlist</h3>
      <br/>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Project #1</Accordion.Header>
          <Accordion.Body>

            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Project #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
    )
 
}

export default ProjectList;