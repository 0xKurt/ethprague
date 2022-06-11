import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useCallContract, useConnectedAccount, useConnectedWeb3, useErc20BalanceOf, useSendTransaction, useTriggerEvent } from '../web3/hooks';
import ConnectButton from '../web3/components/ConnectButton';
import { ClipLoader } from 'react-spinners';
import logo from "../data/ovix.svg"
import contractAbi from "../data/contracts/Airdrop.json"
import { decodeBool, makeHash } from '../web3/utils/func';
import { TransactionButton } from '../web3/components';

const ADDRESS = "0x0d04D490e833cd4446fe453C24291f2D5b74c95a"

const Index = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [content, setContent] = useState(<ClipLoader size={150} />);
  const [id, setId] = useState('')
  const [voucher, setVoucher] = useState('');
  const { account, } = useConnectedAccount();
  const call = useCallContract()

  const [err, setErr] = useState(
    <div>
      <b>Wrong Code!</b>
      <p>Code is wrong or has already been used, sorry!</p>
      <p style={{ marginTop: "15px"}}>
        <br /><br/>
        But if you are interested in our product, head over to <a href="https://0vix.com/" target="_blank">0vix.com</a> and check it out.
        <br /><br/>
        P.S.: 
        Read our
        <a href="https://0vix.com/market_report" target="_blank"> market risk assessment research paper</a>
        <br /><br/>
        Wen Airdrop?
        Join our <a href="https://discord.gg/VxW9Vg6krk" target="_blank">Discord</a> to find out
        or become a Beta Tester and become eligible ;)
      </p>
    </div>
  );

  const [ps, setPs] = useState(
    <p style={{ marginTop: "15px"}}>
    <br /><br/>
    P.S.: 
    Read our
    <a href="https://0vix.com/market_report" target="_blank"> market risk assessment research paper</a>
    <br /><br/>
    Wen Airdrop?
    Join our <a href="https://discord.gg/VxW9Vg6krk" target="_blank">Discord</a> to find out
    or become a Beta Tester and become eligible ;)
  </p>
  )

  const { web3, } = useConnectedWeb3();
  const { event, trigger } = useTriggerEvent();

  const onSuccess = () => {
    console.log("success")
    setContent(<div>
      <b>Congratulations</b>
      <p>You now have $10 of oUSDC in the 0VIX money market. You can start using the protocol and watch the money grow in real-time</p>
     {ps}
    </div>)
  }

  useEffect(() => {
    const init = async () => {
      let code = urlParams.get('id')
      setId(code)
      if (code && code.length == 18) {
        setVoucher(makeHash(code))
        {
          let isCode = await call({
            address: ADDRESS,
            abi: contractAbi,
            method: 'vouchers',
            args: [makeHash(makeHash(code))]
          })
          isCode = decodeBool(isCode);
          if (isCode) {
            setContent("valid")
          } else {
            setContent(err)
          }
        }
      } else {
        setContent(err)
      }
    }
    init();
  }, [])

  return (
    <>
      <Container className="Container" style={{ padding: '20px' }}>
        <Row className="justify-content-center Head" style={{ width: '100%' }}>
          <Col md='6' className="my-auto" style={{ width: "100%" }}>
            <Row className="justify-content-center">
              <img src={logo} alt="logo" style={{ width: '150px' }} />
            </Row>
            <Row className="justify-content-center" style={{ fontWeight: "600" }}>
              &nbsp; &nbsp; Giveaways
            </Row>
          </Col>
        </Row>
        <Row>
          <Row className="justify-content-center Wrapper" style={{ width: '100%' }}>
            <Col className="Box" md='6'>
              <div className="Content Center">
                {content !== "valid" && <>{content}</>}
                {content === "valid" &&

                  <div>
                    <b>Claim your $10 oUSDC until 30th June</b>
                    <p style={{ marginTop: "15px" }}>
                      <br />
                      Connect your wallet to claim
                      <br />
                    </p>
                    <div className="Center" style={{ marginTop: "20px" }}>
                      <ConnectButton network={80001} />
                    </div>
                    <p style={{ marginTop: "15px" }}>
                      <br />
                      Claim your Token
                    </p>
                    <div className="Center" style={{ marginTop: "20px" }}>
                      <TransactionButton
                        address={ADDRESS}
                        abi={contractAbi}
                        method={'claim'}
                        args={[voucher]}
                        confirmations={1} //optional
                        text={'Claim'}
                        confetti={true}
                        onSuccess={onSuccess}
                      />
                    </div>
                    <p style={{ marginTop: "15px" }}>
                      <br />
                      Head over to <a href="http://0vix.com/" target="_blank">0vix.com</a> check out what we are building.
                      <br />
                    </p>
                   {ps}
                  </div>
                }
              </div>
            </Col>
          </Row>
        </Row>
      </Container>

    </>
  );
}

export default Index;