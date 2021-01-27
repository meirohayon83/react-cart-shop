import React  from "react";
import Filter from "../screens/Filter";
import Products from "../screens/Products";
import './Home.css';

export default function Home() {
 
    return (
      <div>
        <div className="content">
          <div className="main">
            <Filter/>
            <Products/>
          </div>
        </div>
      </div>
    );
  }
