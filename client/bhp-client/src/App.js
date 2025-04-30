import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(["other"]);
  const [predicted_price, setPredictedPrice] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_locations")
      .then((response) => response.json())
      .then((data) => setData(data["locations"]));
  }, []);

  function clear_from() {
    document.getElementById("size").value = "";
    document.getElementById("bedrooms").value = "";
    document.getElementById("bathrooms").value = "";
    document.getElementById("location").value = "";
    setPredictedPrice("");
  }

  async function get_esitmated_price(event) {
    event.preventDefault();

    const size = document.getElementById("size").value;
    const bedrooms = document.getElementById("bedrooms").value;
    const bathrooms = document.getElementById("bathrooms").value;
    const location = document.getElementById("location").value;

    const formData = new FormData();
    formData.append("sqft", size);
    formData.append("bhk", bedrooms);
    formData.append("bath", bathrooms);
    formData.append("location", location);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    };
    console.log(requestOptions);
    // fetch('https://corsproxy.io/?/http://127.0.0.1:5000/predict_home_price', requestOptions)
    //     .then(response => response.json())
    //     .then(data => setPredictedPrice("Price - "+data['estimated_price']+" Lakhs Rupees"));

    await axios
      .post("http://127.0.0.1:5000/predict_home_price", formData)
      .then((res) => {
        console.log(res);
        setPredictedPrice(
          "Price - " + res.data["estimated_price"] + " Lakhs Rupees"
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-10 bg-white shadow-xl rounded-lg">
          <h1 className="text-3xl text-center font-semibold mb-4 bg-slate-50">Banglore House Price Pridiction App</h1>
          <form onSubmit={get_esitmated_price} method="POST">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="px-4 text-2xl" htmlFor="size">
                  Size of Home in Square Feet:
                </label>
                <input
                  className="border font-bold text-2xl border-black p-3 text-center w-full mt-2"
                  type="number"
                  name="size"
                  id="size"
                />
              </div>

              <div>
                <label className="px-4 text-2xl" htmlFor="bedrooms">
                  Number of Bedrooms:
                </label>
                <input
                  className="border font-bold text-2xl border-black p-3 text-center w-full mt-2"
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                />
              </div>

              <div>
                <label className="px-4 text-2xl" htmlFor="bathrooms">
                  Number of Bathrooms:
                </label>
                <input
                  className="border  border-black p-3 text-center w-full mt-2 font-bold text-2xl"
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                />
              </div>

              <div>
                <label className="px-4 text-2xl" htmlFor="location">
                  Location:
                </label>
                <select
                  className="p-2 mt-2 font-bold text-2xl w-full border border-black text-center"
                  name="location"
                  id="location"
                >
                  <option
                    className="border border-black p-3 text-center"
                    value=""
                  >
                    Select
                  </option>
                  {data.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                  <option
                    className="border border-black p-3 text-center"
                    value=""
                  >
                    Other
                  </option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="p-4 border border-black bg-blue-500 rounded-2xl w-full sm:w-[30%] hover:bg-green-400"
                type="submit"
              >
                Submit
              </button>
              <button
                className="p-4 border ml-4 border-black bg-red-500 rounded-2xl w-full sm:w-[30%] hover:bg-green-400"
                type="button"
                onClick={clear_from}
              >
                Clear
              </button>
            </div>

          </form>

          <div className="text-center mt-6">
            <span className="text-3xl p-2 rounded-lg font-semibold text-lime-950">{predicted_price}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
