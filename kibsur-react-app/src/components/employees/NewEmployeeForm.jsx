import React, {Component} from 'react';
import StoreSelector from "../inventory/StoreSelector";

class NewEmployeeForm extends Component {

    state = {
        homeStore:'1',
        firstName:'',
        lastName:'',
        employeePhone:''
    };

    render() {
        return (
            <div style={{borderRadius:'4px', backgroundColor:'silver', padding:'0.5rem'}}>
                <button onClick={()=>this.props.onClickExit()}>x</button>
                <div style={{display:'inline'}}>
                <h1>Enter Information for New Employee:</h1>
                    <label>Home Store:</label>
                    <StoreSelector onChangeStore={this.handleSelectStore.bind(this)}/>
                    <label>First Name:</label>
                    <input name={'firstName'} value={this.state.firstName} type={'text'} onChange={(event)=>this.handleChange(event)}/>
                    <label>Last Name:</label>
                    <input name={'lastName'} value={this.state.lastName} type={'text'} onChange={(event)=>this.handleChange(event)}/>
                    <label>Employee Telephone:</label>
                    <input name={'employeePhone'} value={this.state.employeePhone} type={'tel'} maxLength={16} onChange={(event)=>this.handleChange(event)}/>
                    <button onClick={()=>this.createEmployee()}>Create New Employee</button>
                </div>
            </div>);
    }


    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    handleSelectStore(event) {
        event.persist();
        this.setState({homeStore : event.target.value});
    }

    async createEmployee() {
        await fetch(('http://localhost:8080/api/createnew/employee'),
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

export default NewEmployeeForm;
