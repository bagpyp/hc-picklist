import './App.css';
import { useState, useEffect } from 'react';

const ENV = 'PROD'

function App() {

  const PICKLIST_URL = ((ENV === 'DEV') ? 'http://localhost:5000' : 'http://hillcrestsports-picklist.herokuapp.com')

  function Picklist() {
    const [picks,setPicks] = useState([])
    const getPicks = async () => {
      const res = await fetch(PICKLIST_URL)
      const json_res = await res.json()
      setPicks(json_res)
    }
    useEffect(() => {
      getPicks()
    }, [])


    return (
      <div className="Picklist">
        {picks.map((x,index) => (
          <div className = "Pick" key={index}>
            <img src={x['v_image_url']} alt="product"></img>
            <div className = "data">
              <div className = "channel">{x["channel"]} order with ID: {x["id"]} is {x["status"]}</div>
              <div className = "id"></div>
              {/* <div className = "payment_id">{x["payment_id"]}</div> */}
              {/* <div className = "payment_zone">{x["payment_zone"]}</div> */}
              {/* <div className = "amt_total">{x["amt_total"]}</div> */}
              {/* <div className = "order_id">{x["order_id"]}</div> */}
              <div className = "CAT">category: {x["CAT"]}</div>
              <div className = "BRAND">brand: {x["BRAND"]}</div>
              <div className = "name">name: {x["name"]}</div>
              <div className = "year">year: {x["year"]}</div>
              <div className = "size">size: {x["size"]}</div>
              <div className = "color">color: {x["color"]}aka ({x["alt_color"]})</div>
              <div className = "sku">SKU: {x["sku"]}</div>
              <div className = "qty">ON ORDER: x{x["qty"]}</div>
              <div className = "amt_per">Sold at price: {x["amt_per"]}</div>
              <div className = "created_date">date/time: {x["created_date"]}</div>
              <div className = "num_items">{x["num_items"]-1} other item(s) on this order</div>
              {/* <div className = "total_amt">{x["total_amt"]}</div> */}
              <div className = "qty0">RP qty is now: {x["qty0"]}</div>
            </div>  
          </div>
        ))}
      </div>
    )

  }

  return (
    <div>
      <Picklist />
    </div>
  );
}

export default App;
