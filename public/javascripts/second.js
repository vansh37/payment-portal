class Card extends React.Component{             /// return debit/credit card form
    handleSubmit(){
        const value = document.forms["card-form"]["cardNumber"].value;
        var val = "";
        for (var i=0; i<value.length; i++){
            if (value[i] == '-')
                continue;
            val += value[i];
        }
       // alert(val); 
        const flag =  val.split('')
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
                <form name = "card-form" id = "card-form" method="POST" onSubmit = {this.handleSubmit} action="third">
                    {/* cardNumber */}
                    <div className = "card-header">
                        <h3 id = "card-title">Enter Card Details</h3>
                    </div>
                    <div className = "card-body">
                    <div className = "card-number">
                        <input type = "text" id = "cardNumber" placeholder = "XXXX-XXXX-XXXX-XXXX"></input>
                    </div>
                    <br/>
                    <div className = "card-date">
                        <div className="card-month">
                            <select name="Month">
                                <option value="january">January</option>
                                <option value="february">February</option>
                                <option value="march">March</option>
                                <option value="april">April</option>
                                <option value="may">May</option>
                                <option value="june">June</option>
                                <option value="july">July</option>
                                <option value="august">August</option>
                                <option value="september">September</option>
                                <option value="october">October</option>
                                <option value="november">November</option>
                                <option value="december">December</option>
                            </select>
                        </div>
                        <div className="card-year">
                            <select name = "year">
                                <option value = "2016">2016</option>
                                <option value = "2017">2017</option>
                                <option value = "2018">2018</option>
                                <option value = "2019">2019</option>
                                <option value = "2020">2020</option>
                                <option value = "2021">2021</option>
                                <option value = "2022">2022</option>
                                <option value = "2023">2023</option>
                                <option value = "2024">2024</option>
                                <option value = "2025">2025</option>
                                <option value = "2026">2026</option>
                                <option value = "2027">2027</option>
                                <option value = "2028">2028</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className = "card-verification">
                        <div className = "card-cvv">
                            <input type = "password" id = "card-cvv-input" placeholder = "CVV"></input>
                        </div>
                        <div className = "card-cvv-para">
                            <p id = "card-cvv-text">3 or 4 digits usually found <br/> on the signature strip</p>
                        </div>
                    </div>
                    <br/>
                    <div id = "card-button-div">
                        <button type="submit" className="card-submit btn btn-primary">Proceed</button>
                    </div>
                    </div>
                </form>
            </div>
        );
    }
}

class Upi extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           
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
        this.setState({validUpi : (verifyStatus == "true")});
        });
    }

    handleSubmit(e){
      //  e.preventDefault();             /// prevent enter from submitting
       // this.handleVerify();
        // if (this.state.validUpi == false)
        //     console.log("wrong upi id kiddo");

        console.log("helpppp");
        this.handleVerify();
        console.log(this.state.validUpi);
        return false;
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
                    <form className="upi-form" onSubmit = {this.handleSubmit.bind(this)} action = "/third" method = "POST">
                        <div className = "form-group pure-form">
                            <label htmlFor = "upiId">UPI ID</label>
                            <input style={this.state.validUpi === false ? { borderColor: 'red' } : {}} name = "upiId" id = "upiId"
                                 placeholder="name@bank" value = {this.state.upiId} 
                                 onChange = {this.handleChange.bind(this)}></input>
                            <button type = "submit" className = "card-submit btn btn-primary">submit</button>
                        </div>
                    </form>
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
    
    render(){
        //const val = this.props.cost;
        /// https://reactjs.org/docs/handling-events.html IDK how bind works 
        const email = this.props.email;
        const phone = this.props.phone;
        const bill = (email) ? email : phone;
        return (
            <div id = "main">
                <div id ="main-top">
                    <div id = "main-top-right">
                        <h4 id = "payment-text">
                            You have to pay <b>Rs.
                                {this.props.cost}</b>. Your Bill will be sent to 
                                <b>{" " + bill}</b>
                        </h4>
                    </div>
                </div>
                <div id = "main-bottom">
                    <div id = "main-bottom-left">
                        <button className="btn btn-lg" style={(this.state.paymenttype == 1) ? {color:"black"} : {}} onClick = {this.handleClick.bind(this , 1)}>
                            <i className="fas fa-credit-card"></i>Card
                        </button>
                        <button className="btn btn-lg" style={(this.state.paymenttype == 2) ? {color:"black"} : {}} onClick = {this.handleClick.bind(this , 2)}>
                            <i className="fas fa-mobile-alt"></i> UPI
                        </button>
                    </div>
                    <div id = "main-bottom-right">
                        <PaymentForm paymenttype = {this.state.paymenttype}/>
                    </div>

                </div>
            </div>
        );
        
    }
}

ReactDOM.render(<App cost={cost} phone ={phone} email = {email}/>, document.getElementById("root"));

