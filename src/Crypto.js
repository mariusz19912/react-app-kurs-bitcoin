import React, { Component } from "react";
import axios from 'axios';
import CryptoList from './CryptoList';

class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        
    };
   
  }

  onFilter = () => {
    const searchValue = this.InputValue.value.trim().toUpperCase();
    let items = this.state.items;
  
      items = items.filter(rate => {
          return rate.cur.includes(searchValue);
      })
      this.setState({ items });

  }
  getData = () => {

    axios.get(`https://blockchain.info/pl/ticker`).then(res => {
        let tab= [];
        let lastObject = this.state.items
        
         for (let key in res.data){
             let newObj = {
                 cur: key,
                 ...res.data[key]
                 
             }
            
            let oldRate = lastObject.find(oldRate => oldRate.cur === newObj.cur);
            
            if(oldRate !== undefined){
                if(oldRate.last > newObj.last){
                   newObj.class = 'green';
                   newObj.ico = String.fromCharCode(8593);
                } 
                else if(oldRate.last < newObj.last){
                   newObj.class = 'red';
                   newObj.ico = String.fromCharCode(8595);
                }
                else if(oldRate.last === newObj.last){
                newObj.class = 'blue'
                newObj.ico = String.fromCharCode(8596);
                }
                }else {
                    newObj.class = 'blue'
                    newObj.ico = String.fromCharCode(8596);
                    }
            
            tab.push(newObj);
        }
         this.setState ({
             items: tab,
         })
     });
  }
  
  componentDidMount() {
    this.getData();
    setInterval(() => {
        if(this.InputValue.value === ''){
            this.getData(); 
        }
    }, 5000);
    
  }
  
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>CryptoRate</h1>
        </header>
        <input className="user-list-input" type="text" placeholder="Filter" ref={input => this.InputValue = input} 
                onChange={this.onFilter} />
        <CryptoList 
        StateToCryptoList = {this.state.items}
        Filter = {this.state.searchItems}
        />
      </div>
    );
  }
}
export default Crypto;
