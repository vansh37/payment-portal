class Card extends React.Component{             /// return debit/credit card form
    render(){
        cost = this.props.value;
        return(
            <div>
                <h1>
                    card payment
                </h1>
                {cost}
            </div>
        );
    }
}

class Upi extends React.Component{
    render(){
        cost = this.props.value;
        return (
            <div>
                <h1>
                    UPI payment
                </h1>
                {cost}
            </div>
        );
    }
}
class Netbanking extends React.Component{
    render(){
        cost = this.props.value;
        return(
            <div>
                <h1>netbanking payment</h1>
                {cost}
            </div>
        );
    }
}

class Paytm extends React.Component{
    render(){
        cost = this.props.value;
        return(
            <div>
                <h1>
                    Paytm payment
                </h1>
                {cost}
            </div>
        );
    }
}


class PaymentForm extends React.Component{
    render(){
        const paymenttype = this.props.paymenttype;

        if (paymenttype === 1){                                    /// credit / debit card
            return(
                    <Card value  = {cost}/>
            );
        }else if (paymenttype === 2){                               /// UPI
            return (
               <Upi value = {cost} />
            );
        }else if (paymenttype === 3){                               /// netbanking
            return(
                <Netbanking value = {cost} />
            );
        }else if (paymenttype === 4){                                /// paytm
            return(
                <Paytm value = {cost} />
            );
        }else{
            console.log("wrong payment type in props");
            return (
                <h1>
                    wrong paymenttype
                </h1>
            );
        }
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            paymenttype: 1,
        };
    }
    handleClick(i){
      //  alert(i);
        this.setState({paymenttype : i});
    }
    return
    render(){
        //const val = this.props.cost;
        /// https://reactjs.org/docs/handling-events.html IDK how bind works 
        return (
            <div id ="main" >
               <div id = "left-main">
                   <button onClick = {this.handleClick.bind(this , 1)}>
                       <h2>
                           Debit/Credit Card
                       </h2>
                   </button>
                   <button onClick = {this.handleClick.bind(this , 2)}>
                       <h2>
                           UPI
                       </h2>
                   </button>
                   <button onClick = {this.handleClick.bind(this , 3)}>
                       <h2>
                           Netbanking
                       </h2>
                   </button>
                   <button onClick = {this.handleClick.bind(this , 4)}>
                       <h2>
                           Paytm
                       </h2>
                   </button>
               </div>
               <div id ="right-main">
                    <div id = "right-main-top">
                        <h1>
                            You have to pay Rs.
                            {this.props.cost}
                        </h1>
                    </div>
                    <div id = "right-main-bottom">
                            payment insert here
                            <PaymentForm paymenttype = {this.state.paymenttype} />
                    </div>
               </div>
            </div>
        );
    }
}
ReactDOM.render(<App cost={cost} name={'vanshaj'}/>, document.getElementById("root"));

