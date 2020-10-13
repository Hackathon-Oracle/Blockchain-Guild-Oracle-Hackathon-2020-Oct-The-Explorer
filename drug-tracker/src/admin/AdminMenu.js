import React from 'react';

class AdminMenu extends React.Component {

    constructor(props) {
        super();
        console.log(JSON.stringify(props, null, 2));
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(value) {
        console.log('Click happened' + value);
        this.props.selectMenu(value);
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => {this.handleClick('manufacturer')}}>Manufacturer</button>
                </div>
                <div>
                    <button onClick={() => {this.handleClick('transporter')}}>Transporter</button>
                </div>
                <div>
                    <button onClick={() => {this.handleClick('distributor')}}>Distributor</button>
                </div>
                <div>
                    <button onClick={() => {this.handleClick('retailer')}}>Retailer</button>
                </div>
            </div>
        )
    }
}
export default AdminMenu;