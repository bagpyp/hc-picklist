import './App.css';
import { useState, useEffect } from 'react';

const ENV = 'PROD'

function App() {

  const PICKLIST_URL = ((ENV === 'DEV') ? 'http://localhost:5000/' : 'https://hillcrestsports-picklist.herokuapp.com/')
  const [date,setDate] = useState('')

  function Picklist() {
    const [a,setA] = useState(0)
    const [picks,setPicks] = useState([])
    const getPicks = async () => {
      const res = await fetch(PICKLIST_URL)
      const json_res = await res.json()
      setPicks(json_res['data'])
      setDate(json_res['date'])
    }
    useEffect(() => {
      getPicks()
    }, [a])

    function Pick(x) {

      // const [picked, setPicked] = useState(x['picked'])
      const id = x['app_id']
      var picked = x['picked']

      const togglePicked = async () => {
        const res = await fetch(PICKLIST_URL+'pick?app_id='+id, {method:'PUT'})
        const json_res = await res.json()
        picked = json_res
        setA(a+1)
      }

      return (
        <div className = {(picked || x['picked']) ? 'pick picked' : 'pick'} key={id}>

          <img src={x['v_image_url']} alt="product"></img>
          <div className = "sku">{x["sku"]}</div>
          <div className = "qty">{x["qty"]}</div>
          <div className = "created_date">{new Date(x["created_date"]).toLocaleDateString('en-US')}</div>
          
          <div className = "data">
            <div className = "tag">{x["tag"] + (x["app_num_other_items"] ? (' 1/'+ (parseInt(x["app_num_other_items"]) + 1).toString()) : '')}</div>
            <div className = "app_name">{x["app_name"]}</div>
            <div className = "size">{x["size"]}</div>
            <div className = "app_color">{x["app_color"]}</div>
            <div className = "CAT">{x["CAT"]}</div>
            <div className = "BRAND">{x["BRAND"]}</div>
            <div className = "amt_per">{x["amt_per"]}</div>
            <div className = "qty0">{x["qty0"]} left</div>
          </div>  

          <div className = "buttons">
            <label className="switch">
              {picked ? 
                <input type="checkbox" onChange={togglePicked} checked></input> 
                : <input type="checkbox" onChange={togglePicked}></input>}
              <span className="slider round"></span>
            </label>
          </div>

        </div>
      )
    }

    return (
      <div className="picklist">
        {picks.map(x => Pick(x))}
      </div>
    )
  }

  return (
    <div>
      <h4>
        Last Updated {new Date(Date.parse(date)).toLocaleString('en-US')}
      </h4>
      <Picklist />
    </div>
  );
}

export default App;
