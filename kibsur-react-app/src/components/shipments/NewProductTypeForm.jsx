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
                <h3>Enter Information For New Product Type:</h3>
                <label>Product Name:</label>
                <input type={'text'} style={{width:'20%'}} name={'productName'} value={this.state.productName} onChange={this.handleChange.bind(this)}/>
                <label>Product Description:</label>
                <textarea maxLength={255} style={{resize:'none', width:'20%'}} name={'productDescription'} value={this.state.productDescription} onChange={this.handleChange.bind(this)}/>
                <button onClick={()=>this.createNewProduct()}>Add Product Type</button>
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
            .then(data => console.log(data));
        this.props.onAddShipment();
    }

    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }

}

export default NewProductTypeForm;
