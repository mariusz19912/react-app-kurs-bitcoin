import React, { Component } from "react";

class CryptoList extends Component {
   
    render() {
      const data = this.props.StateToCryptoList
        return (
          <div className="item-list">
            <ul>
              {data.map(obj => {
          return <li key={obj.cur} >Last rate: <span className={obj.class}>{obj.last}</span> <span>{obj.ico}</span> <strong>{obj.cur}</strong> <span>[ {obj.symbol} ]</span></li>
        })}
            </ul>
          </div>
        );
      }
};

export default CryptoList;