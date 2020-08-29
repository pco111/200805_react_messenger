import React from 'react';
import './App.css';
import { Button,FormControl,InputLabel,Input} from '@material-ui/core';
import MessageDisplay from './MessageDisplay.js'
import firebase from 'firebase'
import fire from './firebase.js'


class App extends React.Component {
  constructor() {
      super();
      this.state= {
        email: "" ,
        password: "" ,
        typedIn: "" ,
        messages: [] ,
        loggedInObject: {}
      }
      this.handleChange=this.handleChange.bind(this)
      this.sending=this.sending.bind(this)
      this.loginChange=this.loginChange.bind(this)
      this.messagesLoader=this.messagesLoader.bind(this)
      this.authListener=this.authListener.bind(this)
      this.logOut=this.logOut.bind(this)
    }

    handleChange(event) {
      this.setState({[event.target.name]:event.target.value})
    }

    sending(event) {
      event.preventDefault();
      fire.firestore().collection('messages').add({message: this.state.typedIn, email: this.state.email, timestamp: firebase.firestore.FieldValue.serverTimestamp()});
      this.setState({typedIn: ""})
    }

    loginChange(event) {
      event.preventDefault();
      fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
    }

    messagesLoader(dbData) {
      this.setState({messages: dbData})
    }

    componentDidMount() {
      fire.firestore().collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => this.messagesLoader(snapshot.docs.map(doc => doc.data())))
      this.authListener()
    }

    componentDidUpdate() {
      fire.firestore().collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => this.messagesLoader(snapshot.docs.map(doc => doc.data())))
    }

    authListener() {
      fire.auth().onAuthStateChanged(userObject => {
        if(userObject){this.setState({loggedInObject:userObject})} else {this.setState({loggedInObject: null})}
      })
    }

    logOut() {
      fire.auth().signOut();
      this.setState({loggedInObject: null});
    }
    
    //////////////////////////////////////
    ////////The Formatting Section////////
    //////////////////////////////////////
    render() {
      let messageList=this.state.messages.map(message => <MessageDisplay theEmail={message.email} theMessage={message.message} currentEmail={this.state.email}/>)

      if(this.state.loggedInObject==null) {
        return (
          <div className="emailInput">
            <img src={require('./chatAppIcon.png')} alt="chatAppIcon" style={{height: "100px", width:"100px"}}/>
            <form>
              <FormControl>
                <InputLabel >Email</InputLabel>
                <Input name="email" value={this.state.email} onChange={this.handleChange}/>
              </FormControl>
            </form>
            <form>
              <FormControl>
                <InputLabel >Password</InputLabel>
                <Input name="password" value={this.state.password} onChange={this.handleChange}/>
              </FormControl>
            </form>
            <Button style={{margin: "20px"}} variant="contained" color="primary" type="submit" onClick={this.loginChange}>Log In</Button>
          </div>
        )
      }

      return (
        <div className="App">
          <img src={require('./chatAppIcon.png')} alt="chatAppIcon" style={{height: "100px", width:"100px"}}/>
          <h1>Pco111's Messenger</h1>
          <form className="message_input_form">
            <FormControl className="message_input_formControl">
              <Input className="message_input_specific" name="typedIn" placeholder={'Type here...'} value={this.state.typedIn} onChange={this.handleChange}/>
              <Button className="send_message_button" disabled={!this.state.typedIn} variant="contained" color="primary" type="submit" onClick={this.sending}>Send</Button>
              <Button className="logOut_button" variant="contained" color="primary" type="submit" onClick={this.logOut}>Log Out</Button>
            </FormControl>
          </form>
          {messageList}
        </div>
      )
    }
}

export default App
