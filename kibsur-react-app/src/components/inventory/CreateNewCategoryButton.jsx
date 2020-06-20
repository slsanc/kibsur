import React, {Component} from 'react';
import folderPlus from '../../feather/folder-plus.svg'
import xCircle from '../../feather/x-circle.svg'
import check from '../../feather/check.svg'

class CreateNewCategoryButton extends Component {

    state = {
        dialogOpen:false,
        newCategoryName: ''
    };

    render() {
        if(!this.state.dialogOpen) {
            return(<button onClick={()=>this.handleClick()}><img src={folderPlus}/></button>);
        }
        else{
            return(
                <div style={{display:'inline'}}>
                    <label style={{display:'inline'}}>New Folder Name:</label>
                    <input name={'newCategoryName'} value={this.state.newCategoryName} onChange={this.handleChange.bind(this)} type={'text'} style={{width:'20%', display:'inline', marginLeft: '1%'}}/>
                    <button style={{marginLeft: '1%'}} onClick={()=>{this.props.onClickCreateCategory(this.state.newCategoryName); this.handleClick()}}><img src={check}/></button>
                    <button style={{marginLeft: '1%'}} onClick={()=>this.handleClick()}><img src={xCircle}/></button>
                </div>
            )
        }
    }

    handleClick() {
        this.setState(state => {
            let updatedDialogOpenValue = !this.state.dialogOpen;
            return({dialogOpen: updatedDialogOpenValue});
        });
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

}

export default CreateNewCategoryButton;
