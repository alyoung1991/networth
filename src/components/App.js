import React from 'react';
import PieChart from './PieChart';
import coindesk from '../apis/coindesk';
import vanguard from '../apis/vanguard';

class App extends React.Component {
    state = { 
        bitcoin: null, 
        ira: 22293.42, 
        brokerage: 101381.27,
        savings: (100055.38 + 10311.57).toFixed(2), 
        cash: 68507.08
    };

    async componentDidMount(props){
        // bitcoin price getter
        const bitcoinPrice = await coindesk.get();

        const from = new Date()
        from.setDate(from.getDate() - 1);
        from.toISOString().substring(0, 10);

        // Vanguard Index fund getters
        // const VTSAX = await vanguard.get('/VTSAX.US', {
        //     params: {
        //         from: from
        //     }
        // });

        // const VTIAX = await vanguard.get('/VTIAX.US', {
        //     params: {
        //         from: '2021-05-26',
        //         to: '2021-05-27'
        //     }
        // });

        // const VBTLX = await vanguard.get('/VBTLX.US', {
        //     params: {
        //         from: '2021-05-26',
        //         to: '2021-05-27'
        //     }
        // });

        this.setState({
            bitcoin: ((bitcoinPrice.data.bpi.USD.rate_float) * (0.1167934)).toFixed(2)
            // ira: (VTSAX.data[0].close * 210.076).toFixed(2),
            // brokerage: (VTSAX.data[0].close * 667.097 + VTIAX.data[0].close * 690.215 + VBTLX.data[0].close * 529.819).toFixed(2)
        });
    }

    render(){
        return (
            <div>
                <PieChart 
                    bitcoin={this.state.bitcoin} 
                    ira={this.state.ira} 
                    brokerage={this.state.brokerage}
                    savings={this.state.savings} 
                    cash={this.state.cash} 
                />
            </div>
        );
    }
}

export default App;