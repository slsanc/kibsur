import React, {Component} from 'react';
import userPlus from '../../feather/user-plus.svg'
import NewEmployeeForm from "./NewEmployeeForm";

class EmployeesPage extends Component {

    state = {
        employeesList:[],
        isLoading: true,
        subFormOpen: false
    };

    render() {
        if(this.state.subFormOpen){
            return(
                <NewEmployeeForm onClickExit={()=>this.openCloseSubForm()} onRefreshList={()=>this.refreshList()}/>
            )
        }
        else{
            return (
                <div>
                    <button onClick={()=>this.openCloseSubForm()}><img src={userPlus}/></button>
                    <table>
                        {this.displayEmployees()}
                    </table>
                </div>
            );
        }

    }


    componentDidMount() {
        this.refreshList();
    }

    displayEmployees() {
        if(!this.state.isLoading){
            return(
                this.state.employeesList.map(employee =>
                <tr>
                    <td>Employee ID # {employee.employeeId}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.employeePhone}</td>
                </tr>
                )
            );
        }
    }

    openCloseSubForm() {
        this.setState(state=>{
            let newSubFormOpenValue = !this.state.subFormOpen;
            return({subFormOpen: newSubFormOpenValue});
        });
    }

    refreshList() {
        fetch('http://localhost:8080/api/employees/all')
            .then(response=>response.json())
            .then(data=>this.setState({employeesList:data, isLoading:false}));
    }
}

export default EmployeesPage;
