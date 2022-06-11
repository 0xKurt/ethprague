import React, { useEffect, useState } from 'react';
import { Form, Stack, Button, Accordion, Row, Col } from 'react-bootstrap';
import { useCallContract, useConnectedAccount, useConnectedWeb3, useErc20BalanceOf, useEthBalanceOf } from '../web3/hooks';
import Token from '../data/contracts/Token.json'
import { fromWeiToFixed, toWei } from '../web3/utils/func';
import { TransactionButton, ConnectButton } from '../web3/components';
let regex = /^(?:[0-9]\d+|\d)(?:\.\d{0,2})?$/;
const onlyFounders = '0xc944eE998b6793Fa7511605A0577e245B1EEBc5a'

const Home = () => {
  const { account, } = useConnectedAccount();
  const balance = useErc20BalanceOf(onlyFounders, account, 2); // dai address
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
      <br/>
      <ConnectButton language='en' />
      <br/>
      <h3>Create Project</h3>
      <Stack gap={2}>
        <Form >
          <Form.Group as={Row} className="mb-3" >
            <Form.Label column sm={2} >Name</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter project name..." />
            </Col>

            <Form.Label column sm={2} >Description</Form.Label>
            <Col>
              <Form.Control type="textarea" placeholder="Enter project description..." />
            </Col>

          </Form.Group>
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button variant="secondary">Save changes</Button>
            <Button variant="outline-secondary">Cancel</Button>
          </Stack>
        </Form>
      </Stack>
      <br/>
      <hr />
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

    </div>)

  {/**
    Create Projekt: Name + Beschreibung + End Datum
    Projektliste anzeigen
    Projektdetails
     */}
  {/** 
    <Container fluid style={{ padding: '20px' }}>
      <Container style={{ width: '100%', padding: '20px' }}>
        <div style={{ width: '100%', padding: '20px', marginTop: '50px' }}>
        <div>
             
          </div>
          <div>
            <input placeholder='0.x1234...' onChange={onChangeAddress} value={inputValue} className='input-std ml-1' />
          </div>
          <div>
            {errorMessage}
          </div>
          <div>
            Wert:
          </div>
          <div>
            <input placeholder='0.00' onChange={onChangeHandler} value={inputValue} className='input-std ml-1' />
          </div>
          <div>
            {errorMessage}
          </div>
          <div>
            <br />
          </div>
          <div>
            Empfänger:
          </div>
          <div>
            <input placeholder='0x1234...' onChange={onChangeAddress} value={inputAddress} className='input-std ml-1' />
          </div>
        </div>
        <div style={{ width: '100%', padding: '20px'}}>
          <center>
            <TransactionButton
              address={onlyFounders}
              abi={Token}
              method={'mint'}
              args={[inputAddress, toWei(inputValue)]}
              confirmations={1} //optional
              language={'de'} //optional
              text={'Mint'}
            />
          </center>
        </div>

        <div style={{ width: '100%', padding: '20px', marginTop: '50px' }}>
          <div>
            Add new minter (only owner):
          </div>
          <div>
            <input placeholder='0x1234...' onChange={onChangeMinter} value={minter} className='input-std ml-1' />
          </div>
        </div>
        <div style={{ width: '100%', padding: '20px', }}>
          <center>
            <TransactionButton
              address={onlyFounders}
              abi={Token}
              method={'setMinter'}
              args={[minter, "true"]}
              confirmations={1} //optional
              language={'de'} //optional
              text={'Set minter'}
            />
          </center>
        </div>

        <div style={{ width: '100%', padding: '20px', marginTop: '50px' }}>
          <div>
            Transfer Ownership:
          </div>
          <div>
            <input placeholder='0x1234...' onChange={onChangeOwner} value={owner} className='input-std ml-1' />
          </div>
        </div>
        <div style={{ width: '100%', padding: '20px' }}>
          <center>
            <TransactionButton
              address={onlyFounders}
              abi={Token}
              method={'transferOwnership'}
              args={[owner]}
              confirmations={1} //optional
              language={'de'} //optional
              text={'Set owner'}
            />
          </center>
        </div>


      </Container>
      */}
  {/* {web3} */ }
  //</Container>
  //</>
  //);
}

export default Home;