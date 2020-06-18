import React, {Component} from 'react';

class NewProductTypeForm extends Component {

    state = {
        productName:'',
        productDescription:''
    };

    render() {
        return (
            <div style={{backgroundColor:'silver', padding:'0.5rem'}}>
                <button style={{align:'left'}} onClick={()=>this.props.onCloseSubForm()}>x</button>
                <div style={{paddingLeft:'10%', paddingBottom:'10%'}}>
                    <h3>Enter Information For New Product Type:</h3>
                    <label>Product Name:</label>
                    <input type={'text'} style={{width:'40%'}} name={'productName'} value={this.state.productName} onChange={this.handleChange.bind(this)}/>
                    <label>Product Category:</label>
                    <select style={{display:'inline', width:'40%', backgroundColor:'white'}}><option>[catagories go here]</option></select>
                    <button style={{display: 'inline', marginLeft:10}}>Create New Category</button>
                    <label>Product Description:</label>
                    <textarea maxLength={255} style={{resize:'none', width:'40%'}} name={'productDescription'} value={this.state.productDescription} onChange={this.handleChange.bind(this)}/>
                    <button onClick={()=>this.createNewProduct()}>Add Product Type</button>
                </div>
            </div>
        );
    }

    createNewProduct(){
        fetch('http://localhost:8080/api/createnew/product',
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(this.state)
                }
            )
            .then(response => response.json())
            .then(data => this.props.onAddShipment(data));

    }

    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }

}

export default NewProductTypeForm;
