import React from 'react';
import coindesk from '../apis/coindesk';

class App extends React.Component {
    state = { 
        bitcoin: null, 
        ira: null, 
        brokerage: null, 
        stocks: null,
        savings: 100055.38 + 10311.57, 
        cash: 68507.08
    };

    async componentDidMount(props){
        const bitcoinPrice = await coindesk.get();

        this.setState({bitcoin: bitcoinPrice.data.bpi.USD.rate_float});
    }

    render(){
        return (
            <div>
                <ul>
                    <li>Cash: {this.state.cash}</li>
                    <li>Savings: {this.state.savings}</li>
                    <li>Bitcoin Price: {this.state.bitcoin}</li>
                    <li>IRA: {this.state.ira}</li>
                    <li>Personal Brokerage: {this.state.brokerage}</li>
                    <li>Stocks: {this.state.stocks}</li>
                </ul>
            </div>
        );
    }
}

export default App;