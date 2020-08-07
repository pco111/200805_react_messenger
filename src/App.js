import React from 'react';
import './App.css';
import { Button,FormControl,InputLabel,Input} from '@material-ui/core';
import MessageDisPlay from './MessageDisplay.js'

class App extends React.Component {
  constructor() {
      super();
      this.state= {
        typedIn: "" ,
        messages: []
      }
      this.inputChange=this.inputChange.bind(this)
      this.submitting=this.submitting.bind(this)
    }

    inputChange(event) {
      this.setState({typedIn:event.target.value})
    }

    submitting(event) {
      event.preventDefault();
      this.setState({messages: [...this.state.messages, this.state.typedIn], typedIn: "" })
    }
 
    render() {
    let messageList=this.state.messages.map(message => (<p>{message}</p>))

      return (
        <div className="App">
          <h1>Pco111's Messenger</h1>
          <form>
            <FormControl>
              <InputLabel >Type here...</InputLabel>
              <Input value={this.state.typedIn} onChange={this.inputChange}/>
              <Button disabled={!this.state.typedIn} variant="contained" color="primary" type="submit" onClick={this.submitting}>Send </Button>
            </FormControl>
          </form>
          {messageList}
        </div>
      )
    }
  
}

export default App
