import React, {Component} from 'react';
import folder from "../../feather/folder.svg";

class InventoryBrowserCategoryEntry extends Component {

    state = {checked: false};

    render() {
        if (this.props.category.categoryId != 1) {
            return (
                <tr style={this.rowStyle()}>
                    {this.displayCheckbox()}
                    <td onClick={() => this.props.onClickCategory(this.props.category)}><img src={folder}/></td>
                    <td onClick={() => this.props.onClickCategory(this.props.category)}> </td>
                    <td onClick={() => this.props.onClickCategory(this.props.category)}>{this.props.category.categoryName}</td>
                    <td onClick={() => this.props.onClickCategory(this.props.category)} colSpan={3}></td>
                </tr>
            );
        }
        else{
            return null;
        }
    }

    displayCheckbox() {
        if(!this.props.hideCheckbox){
            return (
                <td>
                    <input type={'checkbox'}
                           objectid={this.props.category.categoryId} objecttype='category'
                           onChange={(event) => {
                               this.props.onClickCheckbox(event);
                               this.changeCheckedValue();
                           }}/>
                </td>
            );
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
