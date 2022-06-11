import React, { useEffect, useState } from 'react';
import { Form, Stack, Button, Accordion, Row, Col } from 'react-bootstrap';
import { useCallContract, useConnectedAccount, useConnectedWeb3, useErc20BalanceOf, useEthBalanceOf } from '../web3/hooks';
import Token from '../data/contracts/Token.json'
import { fromWeiToFixed, toWei } from '../web3/utils/func';
import { TransactionButton, ConnectButton } from '../web3/components';
let regex = /^(?:[0-9]\d+|\d)(?:\.\d{0,2})?$/;

const CreateProject = () => {
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
        </div>
    )

}

export default CreateProject;