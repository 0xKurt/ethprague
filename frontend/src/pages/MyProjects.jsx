import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useConnectedAccount, useEmptyWeb3, useErc20BalanceOf } from '../web3/hooks';
import { contracts } from "../data/Contracts.json";
import ClipLoader from "react-spinners/ClipLoader";
import { TransactionButton } from '../web3/components';

const MyProjects = () => {
  const { account, } = useConnectedAccount();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const eWeb3 = useEmptyWeb3();
  const [contract, setContract] = useState('')
  const [list, setList] = useState();

  useEffect(() => {
    const func = async () => {
      console.log(eWeb3)
      const contract = new eWeb3.eth.Contract(contracts.project.abi, contracts.project.address);
      setContract(contract);
      const length = await contract.methods.getProjectLength().call();
      let projects = [];
      let qsExt = [];
      let accordion = [];
      for (let i = 0; i < length; i++) {
        const projectId = await contract.methods.getProjectAt(i).call();
        const project = await contract.methods.projects(projectId).call();
        projects.push(project);

        await fetch(`https://ipfs.io/ipfs/${project.ipfs}`)
          .then(res => res.json())
          .then(data => {
            qsExt[i] =
            {
              ...project,
              name: data.name,
              description: data.description,
            }
          }).catch(async () => {
            await fetch(`https://dweb.link/ipfs/${project.ipfs}`)
              .then(res => res.json())
              .then(data => {
                qsExt[i] =
                {
                  ...project,
                  name: data.name,
                  description: data.description,
                }
              })
          })
        if (qsExt[i].owner == account) {
          accordion.push(
            <Accordion.Item eventKey={i}>
              <Accordion.Header>{qsExt[i].name}</Accordion.Header>
              <Accordion.Body>
                <div style={{ fontSize: "10px" }}>id: {project.id}<br /></div>
                <br />
                {qsExt[i].description}
                <br />
                <div style={{ marginTop: "40px", width: "100%"}}>
                  <center>
                  {(await contract.methods.funds(project.id).call()) > 0 ?
                    <div> <center>
                      <TransactionButton
                        address={contracts.project.address}
                        abi={contracts.project.abi}
                        method="withdrawFunds"
                        args={[project.id]}
                        text={"Withdraw Funds"}
                      />
                      </center>
            </div> : <div>No funds</div>}
            </center>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          )
        }
      }
      if(accordion.length > 0) { setList(accordion) } else {
        setList(<p> no projects found</p>)
      }
      setLoading(false)
    }

    if (eWeb3 && account) func();
  }, [eWeb3, account])

  useEffect(() => {

  })

  if(!account) return(<div style={{marginTop: "40px"}}>Please connect to your wallet</div>)
  if (loading) return (<ClipLoader size={150} />)

  return (
    <div className="col-md-5 mx-auto">
      <h3>My Projects</h3>
      <br />
      <Accordion defaultActiveKey="0" flush>
        {list}
      </Accordion>
    </div>
  )

}

export default MyProjects;