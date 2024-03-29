import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [totalActualPrice, setTotalActualPrice] = useState("");
  const addNewMember = () => {
    const tmp = [...list];
    tmp.push({
      name: "",
      originPrice: "",
      percent: "",
      actualPrice: "",
    });
    setList(tmp);
  };

  const calculate = () => {
    if (list.some((mem) => !mem.originPrice)) {
      alert("please fill all origin price");
      return;
    }
    if (!totalActualPrice) {
      alert("please fill total actual price");
      return;
    }
    const totalOrginPrice = list.reduce(
      (acc, curr) => acc + +curr.originPrice,
      0
    );
    let tmp = [...list];
    tmp = tmp.map((mem) => {
      mem.percent = (+mem.originPrice / +totalOrginPrice) * 100;
      mem.actualPrice = Math.ceil((mem.percent * +totalActualPrice) / 100);
      return mem;
    });
    setList(tmp);
  };

  const setOriginPrice = (value, index, field) => {
    list[index][field] = value;
    setList(list);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  console.log("list", list);
  return (
    <>
      <h1>List member</h1>
      <div className="action">
        <button onClick={addNewMember}>add member</button>
        <button onClick={calculate}>calculate</button>
      </div>
      <div>
        <span>Total Actual Price</span>
        <input
          name="total-actual-price"
          value={totalActualPrice}
          onChange={(event) => setTotalActualPrice(event.target.value)}
        />
      </div>
      <div className="list-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>OriginPrice</th>
              <th>Percent</th>
              <th>ActualPrice</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr className="item" key={index}>
                <td>
                  <input
                    className="name"
                    defaultValue={item.name}
                    onChange={(event) =>
                      setOriginPrice(event.target.value, index, "name")
                    }
                  />
                </td>
                <td>
                  <input
                    className="origin"
                    defaultValue={item.originPrice}
                    onChange={(event) =>
                      setOriginPrice(event.target.value, index, "originPrice")
                    }
                  />
                </td>
                <td>
                  <input disabled className="percent" value={item.percent} />
                </td>
                <td>
                  <input
                    disabled
                    className="actual"
                    value={numberWithCommas(item.actualPrice)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
