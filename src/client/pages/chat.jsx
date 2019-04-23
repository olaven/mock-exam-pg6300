import React from "react";
import { Button, Input } from 'reactstrap';


export class Chat extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            input: "",
            messages: [], 
            username: "", 
            showChat: false 
        }
    }

    componentDidMount() {

        this.socket = new WebSocket("ws://" + window.location.host + "/chat");
        this.socket.onmessage = (event => {

            const data = JSON.parse(event.data);
            this.setState(
                previous => {
                    return (previous.messages === null ? 
                        {messages: data.messages}: 
                        {messages: [...previous.messages, ...data.messages]}) 
                }
            );
        });

        // if user is logged in, s/he should not enter username 
        const loggedIn = this.props.username !== null;
        if (loggedIn) {
            this.setState({
                username: this.props.username, 
                showChat: true 
            });
        }
    }

    onInputChange = event => {
        
        const input = event.target.value; 
        this.setState({input}); 
    }

    sendMessage = () => {
        
        const payload = JSON.stringify({ 
            message: {
                username: this.state.username,
                text: this.state.input 
            }
        });

        this.socket.send(payload);
        this.setState({input: ""});
    }

    renderMessages = () => 
        this.state.messages.map(message =>
            <p>{message.username} - {message.text}</p>
        ); 

    enterChat = event => {

        const username = this.state.username;
        console.log(username.trim().length);
        if (username.trim().length >= 0) {
            
            this.setState({
                showChat: true 
            })
        } else {
            alert("invalid username.");
        }
    }

    onUsernameInput = event => {

        this.setState({
            username: event.target.value
        });
    }

    renderIdInput = () => <div>
        <Input onInput={this.onUsernameInput} type="text" placeholder="chat username"/>
        <Button onClick={this.enterChat}>Enter chat</Button> 
    </div>

    renderChat = () => <div id="chat">
        <h1>Chat</h1>
        <div id="messages">
            {this.renderMessages()}
        </div>
        <input id="chat-input" type="text" onChange={this.onInputChange} value={this.state.input} />
        <button id="chat-button" onClick={this.sendMessage}>Send</button>
    </div>


    render() {

        if (this.state.showChat) {

            return this.renderChat(); 
        } else {

            return this.renderIdInput(); 
        }    
    }
}

