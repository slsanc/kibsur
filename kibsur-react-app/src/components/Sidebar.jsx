import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import InventoryPage from "./Inventory/InventoryPage";

class Sidebar extends Component{

    state={
        expanded: false
    }

    render(){
        return(
            <td style={{backgroundColor:'#0366ee', textAlign:'center', padding:10,
                width: '5%', whiteSpace: "nowrap", color: 'white', fontSize: 20}}>
                <button style={{fontSize:30}} onClick={()=>this.expandMenu()}>☰</button>
                {this.state.expanded &&
                    <div>
                        <button onClick={() => this.props.onClickSidebar(<InventoryPage/>)}>Inventory</button>
                        <br/>
                        <button>Shipments</button>
                        <br/>
                        <button>Sales</button>
                        <br/>
                        <button>Employees</button>
                        <br/>
                        <button>New Location</button>
                    </div>
                }
            </td>
        );
    }

    expandMenu() {
        this.setState(state => {
            let newExpandedValue = !this.state.expanded;
            return({
                expanded: newExpandedValue
            });
        })
    }

    changePage(input){
        ReactDOM.render(
            input , document.getElementById("contentDisplay")
        )
    }
}



export default Sidebar;