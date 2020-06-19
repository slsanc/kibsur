import React, {Component} from 'react';
import folder from "../../feather/folder.svg";

class InventoryBrowserCategoryEntry extends Component {

    state = {checked: false};

    render() {
        if (this.props.category.categoryId != 1) {
            return (
                <tr style={this.rowStyle()}>
                    <td>
                        <input type={'checkbox'}
                               objectid={this.props.category.categoryId} objecttype='category'
                               onChange={(event)=>{this.props.onClickCheckbox(event); this.changeCheckedValue();}}/>
                    </td>
                    <td onClick={()=>this.props.onClickCategory(this.props.category.categoryId)}><img src={folder}/></td>
                    <td onClick={()=>this.props.onClickCategory(this.props.category.categoryId)}>{this.props.category.categoryId}</td>
                    <td onClick={()=>this.props.onClickCategory(this.props.category.categoryId)}>{this.props.category.categoryName}</td>
                    <td onClick={()=>this.props.onClickCategory(this.props.category.categoryId)} colSpan={3}></td>
                </tr>
            );
        }
        else{
            return null;
        }
    }

    rowStyle(){
        if (this.state.checked){
            return ({backgroundColor:'silver'})
        }
    }

    changeCheckedValue() {
        this.setState(state => {
            let newCheckedValue = !this.state.checked;
            return ({checked: newCheckedValue});
        })
    }
}

export default InventoryBrowserCategoryEntry;
