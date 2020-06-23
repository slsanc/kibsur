import React, {Component} from 'react';

class EmployeeSelector extends Component {

    state = {
        listOfAllEmployees:[],
        loading: true,
        selectedCategory: 1
    };

    render() {
        return (
                <select name={'employeeId'} style={{display: 'inline', marginLeft:'1%', marginRight:'1%', backgroundColor:'white'}} onChange={event=>this.props.handleChangeSelection(event)}>
                    {this.displayOptions()}
                </select>
        );
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/employees/all')
            .then(response => response.json())
            .then(data => this.setState({listOfAllEmployees: data, loading:false}));
    }

    displayOptions() {
        if(this.state.loading){
            return(<option>Loading Options</option>);
        }
        else{
            return(
            this.state.listOfAllEmployees.map(employee => <option value={employee.employeeId}>{employee.employeeId} - {employee.firstName} {employee.lastName}</option>))
        }
    }
}

export default EmployeeSelector;
