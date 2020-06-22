import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ShipmentsPage from "./shipments/ShipmentsPage";
import InventoryBrowser from "./inventory/InventoryBrowser";
import clipboard from "../feather/clipboard.svg";
import truck from "../feather/truck.svg";
import dollarSign from "../feather/dollar-sign.svg";
import user from "../feather/user.svg"
import mapPin from "../feather/map-pin.svg"


class Sidebar extends Component{

    state={
        expanded: false
    };

    render(){
        return(
            <td style={{backgroundColor:'#0366ee', padding:10,
                width: '5%', whiteSpace: "nowrap", color: 'white', fontSize: 20}}>
                <button style={{fontSize:30}} onClick={()=>this.expandMenu()}>☰</button>
                {this.state.expanded &&
                    <div>
                        <button onClick={() => this.props.onClickSidebar(<InventoryBrowser onClickProduct={()=>{return(null);}}/>)}>
                            <img style={{verticalAlign:'middle', padding: '5%'}} src={clipboard}/>
                            Inventory
                        </button>
                        <br/>
                        <button onClick={() => this.props.onClickSidebar(<ShipmentsPage/>)}>
                            <img style={{verticalAlign:'middle', padding: '5%'}} src={truck}/>
                            Shipments
                        </button>
                        <br/>
                        <button>
                            <img style={{verticalAlign:'middle', padding: '5%'}} src={dollarSign}/>
                            Sales
                        </button>
                        <br/>
                        <button>
                            <img style={{verticalAlign:'middle', padding: '5%'}} src={user}/>
                            Employees
                        </button>
                        <br/>
                        <button>
                            <img style={{verticalAlign:'middle', padding: '5%'}} src={mapPin}/>
                            Locations
                        </button>
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