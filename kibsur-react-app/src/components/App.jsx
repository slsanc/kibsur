import React, {Component} from 'react'
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

class App extends Component{

    state={
        currentPageType: <Dashboard/>
    };

    render(){
        return(
            <table style={{height:'100vh', margin:0}}>
                <tr style={{verticalAlign:'top'}}>
                    <Sidebar onClickSidebar={(newPageType)=>this.changePageType(newPageType)}/>
                    <td id="contentDisplay" className={""}>
                        {this.state.currentPageType}
                    </td>
                </tr>
            </table>
        );
    }

    changePageType(input) {
        this.setState({currentPageType: input});
    }
}

export default App