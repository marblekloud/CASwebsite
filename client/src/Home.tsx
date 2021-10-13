import React, { PureComponent } from 'react';
import './App.css';
import API from './utils/API';


interface texts {
    imageList: any[];
    description:string;
    sender: string;
};

class Home extends PureComponent<{}, texts> {
    constructor(props: {}) {
        super(props);

        this.state = {
            sender: '',
            description: '',
            imageList: [],
        };
    }

    componentDidMount = () => {
        this.GetTexts();
        var sSender = window.prompt('Your name is:'); 
        if(sSender != null){
            if(!sSender.trim()){
                this.setState({sender: 'Anonymous'});
            }
            else {
                this.setState({sender: sSender});
            }
        }
    }
    componentDidUpdate() {
        // I was not using an li but may work to keep your div scrolled to the bottom as li's are getting pushed to the div
        const objDiv = document.getElementById('scroll');
        if (objDiv!=null){
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }

    GetTexts = () => {
        API.getTexts()
            .then(response => {
                this.setState({ imageList: response.data.texts });
            })
            .catch(err => alert(err));
    }

    SendText = () => {
        let textData = new FormData();
        textData.append('sender', this.state.sender);
        textData.append('description', this.state.description);

        API.sendText({sender: this.state.sender, description: this.state.description})
            .then((response) => {
                this.GetTexts();
            })
            .catch(err => alert('Error: ' + err));
            this.GetTexts();
    }

    deleteFile = (id: any) => {
        API.deleteText(id)
            .then((response) => {
                if (response.data.success) {
                    this.setState({ imageList: this.state.imageList.filter(el => el._id !== id)});
                }
            })
            .catch(err => alert(err));
    }

    render(){
        return (
            <div className = "everything">
                <div className = "chatandbox">
                 <div className = "scroll" id = "scroll">
                    {this.state.imageList.map((text) => (
                        <div >
                            <b className="Sender">{text.sender}</b>
                            <small className = "Date">{text.createdAt.slice(0, -14)} {text.createdAt.slice(11, -5)}</small>
                            <button className = "deletebutton" onClick={() => this.deleteFile(text._id)}>Delete</button>
                            <p className= "Textt">{text.description}</p>
                            
                        </div>
                    ))}
                </div>
                <div className="input">
                    <input
                        id = "textbox"
                        className = "inputBox"
                        type="text"
                        onChange={event => this.setState({ description: event.target.value })}
                        value={this.state.description}
                    />
                    <button className="button" id = "sendButton"onClick={this.SendText}>Send</button>
                </div>
                </div>
            </div>
        );
    }
}

export default Home;