class Card extends React.Component{             /// return debit/credit card form
    render(){
        cost = this.props.value;
        return(
            <div>
               <h1>
                   card
               </h1>
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
        const email = this.props.email;
        const phone = this.props.phone;
        const bill = (email) ? email : phone;
        return (
            <div id ="main" >
               <div id = "left-main">
                   <h1>Payment Methods</h1>
                   <button className="btn btn-lg" onClick = {this.handleClick.bind(this , 1)}>
                     <i className="fas fa-credit-card"></i>Card
                   </button>
                   <button className="btn btn-lg" onClick = {this.handleClick.bind(this , 2)}>
                     <i className="fas fa-mobile-alt"></i> UPI
                   </button>
                   <button className="btn  btn-lg" onClick = {this.handleClick.bind(this , 3)}>
                      <i className="fas fa-globe"></i>Netbanking
                   </button>
                   <button className="btn  btn-lg" onClick = {this.handleClick.bind(this , 4)}>
                     <i className="fas fa-qrcode"></i> Paytm
                   </button>
               </div>
               <div id ="right-main">
                    <div id = "right-main-top">
                        <h3>
                            You have to pay Rs.
                            {this.props.cost}. Your Bill will be sent to 
                            {" " + bill}
                        </h3>
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
ReactDOM.render(<App cost={cost} phone ={phone} email = {email}/>, document.getElementById("root"));

