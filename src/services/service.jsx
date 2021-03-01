const URL = `http://localhost:3333/list`
export const listAPI = async () => {
  const conf = {
    method: 'GET'
  }
  const resp = await fetch( URL, conf )
    .then( data => data.json() )
  return resp
}

export const listAPIPOST = async item => {
  const body = JSON.stringify( { item } )
  const conf = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body
  }
  return await fetch( URL, conf )
  .catch( err => console.err( err ) )
}