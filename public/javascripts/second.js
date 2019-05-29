class Card extends React.Component{             /// return debit/credit card form

    handleSubmit(){
        const value = document.forms["card-form"]["cardNumber"].value;
        const flag =  value.split('')
            .reverse()
            .map( (x) => parseInt(x, 10) )
            .map( (x,idx) => idx % 2 ? x * 2 : x )
            .map( (x) => x > 9 ? (x % 10) + 1 : x )
            .reduce( (accum, x) => accum += x ) % 10 === 0;

        if (flag == false){
            alert("Wrong card value entered");
            return false;
        }else{
            return true;
        }
    }
    render(){
        cost = this.props.value;
        return(
            <div className="card-container">
                <form name = "card-form" method="POST" onSubmit = {this.handleSubmit} action="#">
                    <label htmlFor="number">Card number</label>
                    <input type="number" className="form-control" id="number"
                        name = "cardNumber" placeholder="XXXXXXXXXXXXXXXX" required>
                    </input>
                    <label htmlFor="month">Expiry Date</label>
                    
                    <div className="form-control">
                        <input type="number"  id = "month"
                            name = "month" placeholder = "MM" required></input>
                        <input type = "number" id = "year"
                            name = "year" placeholder="YY" required></input>
                    </div>
                    <label htmlFor ="cvv">CVV</label>
                    <div className="form-control">
                         <input type = "number" id = "cvv"
                            name = "cvv" placeholder = "CVV" required></input>
                    </div>
                        <button type="submit" className = "btn btn-success">Submit</button>
                        <button type="reset" className = "btn btn-danger">Cancel</button>
                    
                </form>
            </div>
        );
    }
}

class Upi extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            buttonClicked: false,
            validUpi: null,
            upiId: "",
        };
    }
    handleVerify(){
        this.setState({buttonClicked : true});
        superagent
        .post('/upiVerify')
        .send({ upiId : this.state.upiId })
        .then(res => {
           const verifyStatus = res.text;
           (verifyStatus == "true") ? 
            this.setState({validUpi : true}) : this.setState({validUpi : false});
        });
    }

    handleSubmit(e){
      //  e.preventDefault();             /// prevent enter from submitting
        this.handleVerify();
        if (this.state.validUpi)
            return true;
        else return false;
    }
   
    handleChange(e){
        this.setState({upiId : e.target.value});
        //alert(this.state.upiId);
  }

    render(){
      //  console.log(this.state.buttonClicked);
        cost = this.props.value;
        const validUpi = this.state.validUpi;
        
            return(
                <div className = "card-container">
                    <form onSubmit = {this.handleSubmit} action = "/third" method = "POST">
                        <div className = "form-group pure-form">
                            <label htmlFor = "upiId">UPI ID</label>
                            <input style={this.state.validUpi === false ? { borderColor: 'red' } : {}} name = "upiId" id = "upiId"
                                 placeholder="name@bank" value = {this.state.upiId} 
                                 onChange = {this.handleChange.bind(this)}></input>
                            <button type = "submit">submit</button>
                        </div>
                    </form>
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
                            <PaymentForm paymenttype = {this.state.paymenttype} />
                    </div>
               </div>
            </div>
        );
    }
}

ReactDOM.render(<App cost={cost} phone ={phone} email = {email}/>, document.getElementById("root"));

