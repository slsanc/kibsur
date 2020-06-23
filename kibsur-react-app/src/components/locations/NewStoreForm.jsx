import React, {Component} from 'react';
import StoreSelector from "../inventory/StoreSelector";

class NewStoreForm extends Component {

    state = {
    };

    render() {
        return (
            <div style={{borderRadius:'4px', backgroundColor:'silver', padding:'0.5rem'}}>
                <button onClick={()=>this.props.onClickExit()}>x</button>
                <div style={{display:'inline'}}>
                    <h1>Enter Information for New Store Location:</h1>
                    <label>Address:</label>
                    <input name={'address'} value={this.state.address} type={'text'} onChange={(event)=>this.handleChange(event)}/>
                    <label>City:</label>
                    <input name={'city'} value={this.state.city} type={'text'} onChange={(event)=>this.handleChange(event)}/>
                    <label>State or Provence:</label>
                    <input name={'stateOrProvence'} value={this.state.stateOrProvence} type={'tel'} maxLength={16} onChange={(event)=>this.handleChange(event)}/>
                    <label>Postal Code:</label>
                    <input name={'postalCode'} value={this.state.postalCode} type={'tel'} maxLength={16} onChange={(event)=>this.handleChange(event)}/>
                    <button onClick={()=>this.createStore()}>Create New Store</button>
                </div>
            </div>);
    }


    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    async createStore() {
        await fetch(('http://localhost:8080/api/createnew/store'),
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            })
            .then(response=>response.json())
            .then(data=>console.log(data));

        this.props.onRefreshList();
        this.props.onClickExit();
    }
}

export default NewStoreForm;
