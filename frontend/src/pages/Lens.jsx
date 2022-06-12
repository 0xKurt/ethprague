import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { apolloClient } from './ApolloClient';
import { gql } from '@apollo/client'

const AUTHENTICATION = `
 mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`

const Lens = () => {
  const [lens1, setLens1] = useState('')
  const address = ''; 
  const signature = ''; 

  const buttonClick = async (address, signature) => {
    await apolloClient.mutate({
      mutation: gql(AUTHENTICATION),
      variables: {
        request: {
          address,
          signature,
        }
      }
    }).then(response => {
      console.log('Lens example data: ', response)
    })
  }


  return (
    <div className="col-md-5 mx-auto">
      <h3>This is Lens. </h3>
      <Button onClick={buttonClick}>Click me! </Button>
      <p>{lens1}</p>
      <br />
      <hr />


    </div>
  )

}
export default Lens;