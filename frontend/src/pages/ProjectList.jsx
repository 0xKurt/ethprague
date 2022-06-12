import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useConnectedAccount, useEmptyWeb3, useErc20BalanceOf } from '../web3/hooks';
import { contracts } from "../data/Contracts.json";
import ClipLoader from "react-spinners/ClipLoader";

const ProjectList = () => {
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
      for (let i = length-1; i>=0; i--) {
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
          let ds = new Date(qsExt[i].startDate*1000);
          let yes = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(ds);
          let mos = new Intl.DateTimeFormat('en', { month: 'short' }).format(ds);
          let das = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(ds);
          console.log(`${das}-${mos}-${yes}`);

        accordion.push(
          <Accordion.Item eventKey={i}>
            <Accordion.Header>{qsExt[i].name}</Accordion.Header>
            <Accordion.Body>
              <div style={{ fontSize: "10px" }}>id: {project.id}<br /></div>
              <br />
              <div style={{ fontSize: "12px" }}>
              start date: {das}-{mos}-{yes} &nbsp; &nbsp; 
              {/* | &nbsp; &nbsp; end date: {dae}-{moe}-{yee} */}
              </div>
              <br />
              {qsExt[i].description}
            </Accordion.Body>
          </Accordion.Item>
        )
      }
      setList(accordion)
      setLoading(false)
    }

    if (eWeb3) func();
  }, [eWeb3])

  useEffect(() => {

  })

  if (loading) return (<ClipLoader size={150} />)

  return (
    <div className="col-md-5 mx-auto" style={{ marginTop: "40px" }}>
      <h3>Project List</h3>
      <br />
      <Accordion defaultActiveKey="0" flush>
        {list}
      </Accordion>
    </div>
  )

}

export default ProjectList;