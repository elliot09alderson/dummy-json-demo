import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const Feature = () => {
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [search, setSearch] = useState("");

  const apiurl = `https://dummyjson.com/products?limit=${limit}&skip=${
    (page - 1) * limit
  }`;

  const [cardsData, setCardsData] = useState([]);
  const [loader, setLoader] = useState(false);

  async function fetchData() {
    try {
      setLoader(true);

      const { data } = await axios.get(apiurl);
      console.log(data.products);
      setCardsData(data.products);
      setLoader(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [page, limit]);

  async function searchData() {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${search}`
    );

    console.log(data.products);
    setCardsData(data.products);
  }
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex-center">
          <div className="flex-row">
            <input
              type="text"
              className="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div onClick={searchData}>search</div>
          </div>
          <div className="card-group">
            {cardsData.map((item, idx) => (
              <div className="card" key={idx + "card"}>
                <img src={item.thumbnail} alt="" />
                <h1 className="heading">{item.title.slice(0, 14)}</h1>

                <div className="content">{item.description.slice(0, 124)}</div>
              </div>
            ))}
          </div>

          {!search && (
            <div className="flex-row">
              <div onClick={() => page > 1 && setpage(page - 1)}>page-</div>
              <div>{page}</div>
              <div onClick={() => setpage(page + 1)}>page+</div>

              <div>
                <select onChange={(e) => setlimit(e.target.value)}>
                  <option>select limit</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Feature;
