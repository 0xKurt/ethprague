import React from 'react';
import { Form, Row, Stack } from 'react-bootstrap';
import { TransactionButton } from '../web3/components';
import { useConnectedAccount } from '../web3/hooks';
import { contracts } from '../data/Contracts.json';

const Access = () => {
  const { account, } = useConnectedAccount();



  return (
    <div>
      {account && <Stack gap={2}>
        <Form style={{ marginTop: "50px" }}>
          <Form.Group as={Row} className="mb-3" >
            <Row>
              
            </Row>
            <Row sm={10}>
            <center>
              <TransactionButton
                address={contracts.drop.address}
                abi={contracts.drop.abi}
                method="drop"
                args={[]}
                text={"Mint"}
              />
            </center>
            </Row>
          </Form.Group>
        </Form>
      </Stack >}
    </div >
  );
}

export default Access;