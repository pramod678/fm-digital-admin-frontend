import React, { useEffect, useState } from "react";
import "./Create-Release.css";
import { BsCheckCircle, BsClock } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { RiDraftFill } from "react-icons/ri";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
// import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import SideBar from "../components/Sidebar/SideBar";
import { BiCheck } from "react-icons/bi";
// import { Dropdown } from 'semantic-ui-react'

const Catalogs = () => {
  const [catalogsGet, setcatalogsGet] = useState([]);
  const [userData, setUserData] = useState("");
  console.log("catalogsGet", catalogsGet);
  useEffect(() => {
    fetch("http://192.168.95.212:5000/api/v1/user/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setUserData(data.data);
        handlecatalogsGet(data.data);

        // handlegenregGet()
        console.log(data.data);
        if (data.data === "token expired") {
          alert("Token expired login again");
          localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);
  ////getuser
  function handlecatalogsGet(userData) {
    console.log("userData>>>", userData);
    fetch(
      `http://192.168.95.212:5000/api/v1/createRelease/catalogsGet/${userData.users_id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("genere ---------", data.result);
        setcatalogsGet(data.result);
      });
  }
  const [records, setRecords] = useState([catalogsGet]);

  function handleFilter(event) {
    console.log("catalogsGet-->>>", catalogsGet);
    const inputValue = event.target.value || '';
    console.log("inputValue", inputValue);
    const filtered = catalogsGet.filter(row => row.Title.toLowerCase().includes(inputValue)
      || row.ArtistName.toLowerCase().includes(inputValue)
      || row.Label.toLowerCase().includes(inputValue)
      // ||row.action.toLowerCase().includes(inputValue)
    );
    console.log("filtered", filtered);
    setRecords(filtered); // Update the state with the filtered data
  }

  console.log("records", records);
  const iconSelector = (status) => {
    switch (status) {
      case 0:
        return (
          <p style={{ color: "brown" }}>
            <RiDraftFill />
          </p>
        );
      case 1:
        return (
          <p style={{ color: "#808080" }}>
            <BsClock />
          </p>
        );
      case 2:
        return (
          <p style={{ color: "#add8e6" }}>
            <FcCancel />
          </p>
        );
      case 3:
        return (
          <p style={{ color: "#0000cd" }}>
            <VscGitPullRequestNewChanges />
          </p>
        );
      case 4:
        return (
          <p style={{ color: "green" }}>
            <BsCheckCircle />
          </p>
        );
      default:
        return <></>;
    }
  };

  const actionStatus = (status) => {
    switch (status) {
      case 0:
        return (
          <button type="button" className="btn btn-dark">
            Draft
          </button>
        );
      case 1:
        return (
          <button type="button" className="btn btn-light">
            ........
          </button>
        );
      case 2:
        return (
          <button type="submit" className="btn btn-danger">
            Reject
          </button>
        );
      case 3:
        return (
          <button type="button" class="btn btn-secondary">
            Draft
          </button>
        );
      case 4:
        return (
          <button type="button" className="btn btn-success">
            Stors
          </button>
        );
      default:
        return <></>;
    }
  };
  // console.log(catalogsGet[0].tottalTracks);
  //   const [platform, setPlatform] = useState("");
  return (
    <>
      <div className="mai-nev">
        <h3 className="catalogs">Catalog</h3>
        <div
          style={{
            position: "absolute",
            marginLeft: "15%",
            marginTop: "5%",
            fontSize: "150%",
          }}
        >
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Search Title"
              onChange={handleFilter}
            // value={searchTerm}
            // onChange={(e) => {
            //   setSearchTerm(e.target.value);
            //   setCurrentPage(1);
            // }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              marginLeft: "112%",
              top: "0%",
              width: "30%",
            }}
          >
            <select
              className="form-select"
            // value={filterCompleted}
            // onChange={(e) => {
            //   setFilterCompleted(e.target.value);
            //   setCurrentPage(1);
            // }}
            >
              <option defaultValue="All">All</option>
              <option value="true">approved</option>
              <option value="false">Draft</option>
              <option value="false">corrections</option>
            </select>
          </div>

          <h4
            style={{
              position: "relative",
              marginLeft: "350%",
              marginTop: "-12%",
              fontSize: "130%",
            }}
          >
            Total&nbsp;Releases:{catalogsGet[0]?.tottalTracks}
          </h4>
          {/* <p>{message}</p> */}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Album Artwork</th>
              <th>Title</th>
              <th>Artist Name</th>
              <th>Genre</th>
              <th>Label</th>
              <th>Tracks</th>
              <th>Relase Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{iconSelector(item?.Status)}</td>
                <td>
                  <img
                    style={{ height: 60, width: 80 }}
                    src={`http://localhost:5000/${item?.ImageDocument}`}
                    type="file"
                    alt="Art Work"
                  ></img>
                </td>
                <td>{item.Title}</td>
                <td>{item.ArtistName}</td>
                <td>{item.Genre}</td>
                <td>{item.Label}</td>
                <td>{item.Tracks}</td>
                <td>{String(item.createdAt).slice(0, 10)}</td>
                <td>
                  {/* <button type="submit" className="btn btn-danger"> */}
                  {/* Draft */}
                  {actionStatus(item?.Status)}
                  {/* </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Catalogs;
