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
      mem.actualPrice =
        Math.ceil((mem.percent * +totalActualPrice) / 1000 / 100) * 1000;
      return mem;
    });
    const afterActual = tmp.reduce((acc, cur) => {
      return acc + cur.actualPrice;
    }, 0);
    const afterOrigin = tmp.reduce((acc, cur) => {
      return acc + +cur.originPrice;
    }, 0);
    tmp.push({
      id: "total",
      name: "total",
      originPrice: afterOrigin,
      percent: "100",
      actualPrice: afterActual,
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

  const onRemove = (index) => {
    const tmp = [...list];
    tmp.splice(index, 1);
    setList(tmp);
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr
                className={`item ${item.id === "total" ? "total" : ""}`}
                key={index}
              >
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
                <td>
                  <button
                    tabIndex="-1"
                    onClick={() => {
                      onRemove(index);
                    }}
                  >
                    X
                  </button>
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
