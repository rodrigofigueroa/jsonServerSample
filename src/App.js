import React, { 
    useEffect, 
    useState,
    useRef }                from 'react'
import { listAPI, listAPIPOST } from './services/service'
import logo from './logo.svg';
import './App.css';

function App() {
  const [ list, setList ]       = useState( [] )  
  const [ inputVal, setInput ]  = useState( '' )
  const [ mess, setMess ]       = useState( false )
  let mounted = useRef( true )
  useEffect( () => {
    mounted.current = true
    if( list.length && !mess ){
      return
    }
    listAPI().then( data => {
      if( mounted.current ){
        setList( data )
      }
    })
    if( mess ){
      setTimeout( 
        () => {
          if( mounted.current ){
            setMess( false )
          }
        }
        , 3000
      )
    }
    return () => mounted.current = false
  }, [ mess, list ] )

  const handleSubmit = e =>{
    listAPIPOST( inputVal )
    .then( dataPost => {
      console.log( dataPost, dataPost.json() );
      if( mounted.current ){
        setInput( '' )
        setMess( true )
      }
    })
    e.preventDefault()
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="wrapper">
        <ul>
          {
            list 
            ?
              list.map( ( lst, idx ) => <li key={`${lst}${idx}`}> { lst.item } </li> )
            : ''
          }
        </ul>
        <form method="" onSubmit={ handleSubmit }>
          <label > 
            <p>
              New item
            </p>
            <input 
            type="text" 
            placeholder="item" 
            onChange={ e => setInput( e.target.value ) }
            value={ inputVal }
            />
          </label>
          <button type="submit" >Save </button>
        </form>
        {
          mess 
          ?  <h2>The item was added</h2>
          : ''
        }
      </div>
    </div>
  );
}

export default App;
