import React, { useEffect, useState } from "react";
import "./../Create-Release.css";
import SideBar from "../../components/Sidebar/SideBar";

const YoutubeClaims = () => {
  const [formData, setformData] = useState({
    Selectrelease: "",
    SelectAudio: "",
    Selectplatform: "",
    SelectPolicy: "",
    PasteURL: "",
  });
  const [releseInfoGetOne, setReleseInfoGetOne] = useState("");
  const [userData, setUserData] = useState("");
  const [ProfileLinkinAdudiogGet, setprofileLinkinAdudiogGet] = useState([]);
  const [youtubeClaimsGetAll, setyoutubeClaimsGetAll] = useState([]);
  console.log("releseInfoGetOne", releseInfoGetOne);
  console.log("youtubeClaimsGetAll", youtubeClaimsGetAll);
  
  useEffect(() => {
    fetch("https://fmdigitalofficial.in/api/v1/user/userData", {
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
        setUserData(data.data);
        handleyoutubeClaimsGetAll(data.data)

        // console.log("dgd",data.data);
        if (data.data === "token expired") {
          alert("Token expired login again");
          localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);
  ////getuser
  console.log("userData", userData);
  function handlereleseInfoGetOne() {
    // console.log("userData.user_id",userData);
    fetch(
      `https://fmdigitalofficial.in/api/v1/createRelease/releseInfoGetOne/${userData.users_id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {

        // console.log("releseInfoGetOne ---------", data.data);
        setReleseInfoGetOne(data.data);
        // handleProfileLinkinAdudiogGet(data.data)
      });
  };

  function handleProfileLinkinAdudiogGet() {
    // console.log("userData.user_id",userData);
    fetch(
      `https://fmdigitalofficial.in/api/v1/tools/profileLinkinAdudiogGet/users_id/${releseInfoGetOne.users_id}/releseInfo_id/${releseInfoGetOne.releseInfo_id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {

        // console.log("releseInfoGetOne ---------", data.data);
        setprofileLinkinAdudiogGet(data.data);
      });
  };
  function handleyoutubeClaimsGetAll(userData) {
    // console.log("userData.user_id",userData);
    fetch(
      `https://fmdigitalofficial.in/api/v1/tools/youtubeClaimsGetAll/${userData.users_id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("releseInfoGetOne ---------", data.data);
        setyoutubeClaimsGetAll(data.data);
      });
  }
  // console.log("formData",formData);
  const handleSubmit = async (e) => {
    fetch("https://fmdigitalofficial.in/api/v1/tools/youtubeClaimsPost", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        Selectrelease: formData.Selectrelease,
        SelectAudio: formData.SelectAudio,
        Selectplatform: formData.Selectplatform,
        SelectPolicy: formData.SelectPolicy,
        PasteURL: formData.PasteURL,
        users_id: parseInt(userData.users_id),
      }),
    })
      .then((res) => res.json())
      .then((Data) => {
        console.log(Data, "CreateSuccesfully");
        if (Data.status === "ok") {
          alert("Create Successful");
        } else {
          alert("Something went wrong");
        }
      });
  };
  return (
    <>
      <div className="mai-nev">
        <h3 className="catalogs">Youtube Claims</h3>
        <div className="flex-container1">
          <div className="youtube">
            <label className="lable">Select release*</label>

            <select
              className="form-select"
              onClick={handlereleseInfoGetOne}
              onChange={(event) =>
                setformData((prev) => ({
                  ...prev,
                  Selectrelease: event.target.value,
                }))
              }
            >
              <option value="">Select an option</option>
              <option value={releseInfoGetOne?.ReleaseTitle}>
                {releseInfoGetOne?.ReleaseTitle}
              </option>
            </select>
            <label className="lable">Select platform*</label>

            <select
              className="form-select"
              onChange={(event) =>
                setformData((prev) => ({
                  ...prev,
                  Selectplatform: event.target.value,
                }))
              }
            >
              <option>Select platform</option>
              <option value="YoutubeContentID">Youtube Content ID</option>
            </select>
            <label className="lable">Paste URL*</label>

            <input
              type="url"
              className="form-control"
              value={formData.PasteURL}
              onChange={(event) =>
                setformData((prev) => ({ ...prev, PasteURL: event.target.value }))
              }
            ></input>
          </div>
          <div className="label">
            <label className="lable">Select Audio*</label>
            <select
              className="form-select"
              // value={formData.PasteURL}
              onClick={handleProfileLinkinAdudiogGet}
              onChange={(event) =>
                setformData((prev) => ({
                  ...prev,
                  SelectAudio: event.target.value,
                }))
              }
            >
              <option value="">Select an option</option>
              {ProfileLinkinAdudiogGet?.map((option) => (
                <option key={option?._id} value={option?.Title}>
                  {option?.Title}
                </option>
              ))}
            </select>
            <label className="lable">Select Policy*</label>

            <select
              className="form-select"
              // value={formData.PasteURL}
              onChange={(event) =>
                setformData((prev) => ({
                  ...prev,
                  SelectPolicy: event.target.value,
                }))
              }
            >
              <option>Select Policy</option>
              <option value="Monetize">Monetize</option>
              <option value="Remove">Remove</option>
              <option value="Block">Block</option>
            </select>

            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
            <div
              style={{
                position: "relative",
                marginLeft: "-120%",
                marginTop: "10%",
              }}
            >
              <h3>Your UGC Claims History</h3>
            </div>
          </div>

          <table className="table1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Release Title</th>
                <th>Audio Title</th>
                <th>Policy</th>
                <th>Status</th>
                <th>Date</th>
                <th>URLs</th>
              </tr>
            </thead>
            <tbody>
              {youtubeClaimsGetAll.map((item, index) => (
                <tr className="tr" key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.Selectrelease}</td>
                  <td>{item.SelectAudio}</td>
                  <td>{item.SelectPolicy}</td>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>{String(item.createdAt).slice(0, 10)}</td>
                  <td>{item.PasteURL}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default YoutubeClaims;
