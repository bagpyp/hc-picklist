import './App.css';
import { useState, useEffect } from 'react';

const ENV = 'PROD'

function App() {

  const PICKLIST_URL = ((ENV === 'DEV') ? 'http://localhost:5000' : 'https://hillcrestsports-picklist.herokuapp.com')

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
      <div className="picklist">
        {picks.map((x,index) => (
        <div className = "pick" key={index}>

          <img src={x['v_image_url']} alt="product"></img>
          <div className = "sku">{x["sku"]}</div>
          <div className = "qty">{x["qty"]}</div>
          {x["app_num_other_items"] ? <div className = "app_num_other_items">1/{x["app_num_other_items"]}</div> : <div className = "app_num_other_items"></div>}

          

          <div className = "data">
            {/* <div className = "channel">{x["channel"]}</div> */}
            {/* <div className = "id">{x["id"]}</div> */}
            <div className = "tag">{x["tag"]}</div>
            <div className = "app_name">{x["app_name"]}</div>
            {/* <div className = "payment_zone">{x["payment_zone"]}</div> */}
            <div className = "CAT">{x["CAT"]}</div>
            <div className = "BRAND">Brand: {x["BRAND"]}</div>
            {/* <div className = "year">{x["year"]}</div> */}
            <div className = "size">Size: {x["size"]}</div>
            <div className = "app_color">Color: {x["app_color"]}</div>
            {/* <div className = "color">{x["color"]}</div>
            <div className = "alt_color">{x["alt_color"]}</div> */}
            <div className = "sku">{x["sku"]}</div>

            <div className = "amt_per">{x["amt_per"]}</div>
            <div className = "qty0">RP qty: {x["qty0"]}</div>

            <div className = "created_date">{new Date(x["created_date"]).toLocaleDateString('en-US')}</div>

          </div>  

        </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h4>
        Last Updated {new Date().toLocaleString('en-US')}
      </h4>
      <Picklist />
    </div>
  );
}

export default App;
