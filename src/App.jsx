import { useState } from 'react'
import reactLogo from './assets/react.svg'
import produce from "immer"
import './App.css'

function App() {

  const rates = [5, 10, 15, 25, 50]
  const [selectedRate, setSelectedRate] = useState(0)
  const [data, setData] = useState({
    bill: 0,
    peopleCount: 0,
    tipAmount: 0,
    total: 0
  })

  const reset = () => {
    setData({bill: 0,peopleCount: 0,tipAmount: 0,total: 0})
  }

  // const calculateTip = () => {
  //   const result = (data.bill / data.peopleCount) * (selectedRate / 100);
  //   const rounded = Math.round(result * 100) / 100;
  //   const perPersonAmount = (rounded + data.bill) / data.peopleCount;
  //   const newData = produce(data, draft => {
  //     draft.tipAmount = rounded;
  //     draft.total = perPersonAmount;
  //   });
  //   setData(newData);
  // };



  const calculateTip = (event) => {
    let rate = event.target.name
    setSelectedRate(rate)
    console.log("data", data)
    let result = (data.bill / data.peopleCount) * (selectedRate/100)
    let rounded = Math.round(result * 100) / 100;
    const perPersonAmount = (rounded + data.bill) / data.peopleCount;
    let newData = produce(data, (draft) => {
      draft.tipAmount = rounded;
      draft.total = perPersonAmount.toFixed(2)
    });
    setData(newData)
    console.log(newData)
  }


 const addData = (event) => {
    const target = event.target.id;
    const input = parseInt(event.target.value) || 0;
    if (target === "bill") {
      setData(produce(data, draft => {
        draft.bill = input;
      }));
    } else {
      setData(produce(data, draft => {
        draft.peopleCount = input;
      }));
    }
  };


  // const addData = (event) => {
  //   let target = event.target.id
  //   let input = event.target.value
  //   if(target == "bill") {
  //     setData(produce(data, (draft) => {
  //       draft.bill = input;
  //     }));
  //   } 
  //   else {
  //     setData(produce(data, (draft) => {
  //       draft.peopleCount = input;
  //     }));
  //   }
  //   console.log(data)
  // }



  return (
    <div class="calculator">
      <div id="form">
        <div>
          <span>Bill</span>
          <div id="input-container">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1);transform: ;msFilter:;"}}><path d="M15.999 8.5h2c0-2.837-2.755-4.131-5-4.429V2h-2v2.071c-2.245.298-5 1.592-5 4.429 0 2.706 2.666 4.113 5 4.43v4.97c-1.448-.251-3-1.024-3-2.4h-2c0 2.589 2.425 4.119 5 4.436V22h2v-2.07c2.245-.298 5-1.593 5-4.43s-2.755-4.131-5-4.429V6.1c1.33.239 3 .941 3 2.4zm-8 0c0-1.459 1.67-2.161 3-2.4v4.799c-1.371-.253-3-1.002-3-2.399zm8 7c0 1.459-1.67 2.161-3 2.4v-4.8c1.33.239 3 .941 3 2.4z"></path></svg>
            </div>
            <input onChange={addData} id="bill" type="number" placeholder='0' dir="rtl"></input>
          </div>
        </div>
        <div>
          <span>Select Tip %</span>
          <div id="rates">
            {rates.map((rate, index) => (
              (selectedRate == rate)  
                ? <button style={{backgroundColor: "#26c0ab"}} onClick={calculateTip} name={rate} key={index}>%{rate}</button>
                : <button onClick={calculateTip} name={rate} key={index}>%{rate}</button>
            ))}
            <button>Custom</button>
          </div>
        </div>
        <div>
          <span>Number of people</span>
          <div id="input-container">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1);transform: ;msFilter:;"}}><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
            </div>
            <input type="number" onChange={addData} id="peopleNumber" placeholder='0' dir="rtl"></input>
          </div>
        </div>
      </div>
      <div id="data">
        <div>
          <div id="tip">
            <div>
              <p>Tip amount</p>
              <p>/ person</p>
            </div>
            <div>
              <span>${data.tipAmount}</span> 
            </div>
          </div>

          <div id="tip">
            <div>
              <p>Total</p>
              <p>/ person</p>
            </div>
            <div>
              <span>${data.total}</span> 
            </div>
          </div>

        </div>
        
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default App
