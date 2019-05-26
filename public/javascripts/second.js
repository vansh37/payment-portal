// const App = () => {
//     //alert(val);
//     return React.createElement(
//       "div",
//       {},
//       React.createElement("h1", {}, cost)
//     );
//   };

// class App extends React.Component{
//     render(){
//         return (
//             <div>hello world</div>
//         );
//     }
// }
// ReactDOM.render(<App/>, document.getElementById("root"));
  
class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        //const val = this.props.cost;
        return (
            <div id ="main" >
               <div id = "left-main">
                   <button className = "pure-button">
                       <h2>
                           Debit/Credit Card
                       </h2>
                   </button>
                   <button>
                       <h2>
                           UPI
                       </h2>
                   </button>
                   <button>
                       <h2>
                           Netbanking
                       </h2>
                   </button>
                   <button>
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
                        <h1>
                            payment insert here
                        </h1>
                    </div>
               </div>
            </div>
        );
    }
}
ReactDOM.render(<App cost={cost} name={'vanshaj'}/>, document.getElementById("root"));

