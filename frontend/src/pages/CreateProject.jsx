import React, { useState } from 'react';
import { Form, Stack, Button, Row, Col } from 'react-bootstrap';
import { useConnectedAccount } from '../web3/hooks';
import { contracts } from "../data/Contracts.json";
import { create } from 'ipfs-http-client';
import { TransactionButton } from '../web3/components';


const CreateProject = () => {
    const { account, } = useConnectedAccount();
    const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [ipfsHash, setIpfsHash] = useState("")
    const [time, setTime] = useState("")
    
    const updateInputValue = (type, evt) => {
        let val;
        if (evt) val = evt.target.value;
        if (type === 'name') setName(val)
        if (type === 'desc') setDescription(val)
        if (type === 'time') setTime(val)
        if (type === 'cancel') {
            setName("")
            setDescription("")
            setTime("")
        }
    }

    const submit = async () => {
        console.log("submit")
        console.log(name)
        console.log(description)
        console.log(time)
        if (name !== '' && name !== 'undefined' && name !== null &&
            description !== '' && description !== 'undefined' && description !== null &&
            time !== '' && time !== 'undefined' && time !== null
        ) {
            console.log("jo")
            const jason = { name, description, cpr: "Neighborhodli" };
            const { path } = await client.add(JSON.stringify(jason))
            setIpfsHash(path)
            console.log(jason)
            console.log(path)
        }
        console.log("no")
    }

    return (
        <div className="col-md-5 mx-auto" style={{ marginTop: "50px" }}>
            <h3>Create Project</h3>
            {!account &&
                <div style={{ marginTop: "50px" }}>
                    Please connect wallet.
                </div>
            }
            {account && <Stack gap={2}>
                <Form style={{ marginTop: "50px" }}>
                    <Form.Group as={Row} className="mb-3" >
                        <Row>
                            <Form.Label column sm={2} >Name</Form.Label>
                        </Row>
                        <Row sm={10}>
                            <Form.Control type="text" onChange={evt => updateInputValue("name", evt)}
                                value={name} placeholder="Enter project name..." />
                        </Row>
                        <Row>
                            &nbsp;
                        </Row>
                        <Row>
                            <Form.Label column sm={2} >Description</Form.Label>
                        </Row>
                        <Row>
                            <textarea required type="text" style={{ height: "250px", textAlign: "top left" }} type="textarea" onChange={evt => updateInputValue("desc", evt)}
                                value={description} placeholder="Enter project description..." />
                        </Row>
                        <Row>
                            &nbsp;
                        </Row>
                        <Row>
                            <Form.Label column sm={2} >Period</Form.Label>
                        </Row>
                        <Row sm={10}>
                            <Form.Select onChange={evt => updateInputValue("time", evt)}>
                                <option >choose..</option>
                                <option value={(new Date).getTime() + 60 * 60} >1 Hour</option>
                                <option value={(new Date).getTime() + 60 * 60 * 24}>1 Day</option>
                                <option value={(new Date).getTime() + 60 * 60 * 24 * 7}>1 Week</option>
                            </Form.Select>
                        </Row>
                        <Row>
                            &nbsp;
                        </Row>

                    </Form.Group>

                    <Button disabled={ipfsHash !== '' && ipfsHash !== 'undefined' && ipfsHash !== null}
                        variant="primary" style={{ width: "220px" }}
                        onClick={submit}>
                        Create
                    </Button>

                    {!ipfsHash &&
                        <div style={{ padding: "20px" }}>
                            <Button disabled={true} variant="outline-secondary"
                                style={{ width: "220px" }}>
                                Submit
                            </Button>
                        </div>}
                    {ipfsHash && <div style={{ marginTop: "20px" }}>
                        <center>
                            <TransactionButton
                                address={contracts.project.address}
                                abi={contracts.project.abi}
                                method="addProject"
                                args={[ipfsHash, time]}
                                text={"Submit"}
                            />
                        </center>
                    </div>}
                    <Button variant="danger" style={{ width: "220px" }} onClick={() => updateInputValue("cancel", null)}>Cancel</Button>

                </Form>
            </Stack >}
        </div >
    )

}

export default CreateProject;