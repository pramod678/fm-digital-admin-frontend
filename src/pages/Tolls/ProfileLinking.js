import React, { useEffect, useState } from "react";
import "./../Create-Release.css";
import SideBar from "../../components/Sidebar/SideBar";

const ProfileLinking = () => {
  const [formData, setformData] = useState({
    Selectrelease: "",
    SelectAudio: "",
    Selectplatform: "",
    FecebookLink: "",
    InstagramLink: "",
    createdAt: "",
  });
  const [releseInfoGetOne, setReleseInfoGetOne] = useState("");
  const [userData, setUserData] = useState("");
  const [ProfileLinkinAdudiogGet, setprofileLinkinAdudiogGet] = useState([]);
  const [profileLinkingGetAll, setprofileLinkingGetAll] = useState([]);
  console.log("profileLinkingGetAll", profileLinkingGetAll);
  // console.log("releseInfoGetOne",releseInfoGetOne);
  // console.log("ProfileLinkinAdudiogGet",ProfileLinkinAdudiogGet);
  const data = [
    {
      id: 1,
      ReleaseTitle: "hggsdhg",
      AudioTitle: "sonfgdg",
      Artist: "jhjdshjhsj",
      FB: "true",
      IG: "06-06-2023",
      Status: "hgdhg",
      Date: "07-07-2023",
    },
    {
      id: 2,
      ReleaseTitle: "hggsdhg",
      AudioTitle: "sonfgdg",
      Policy: "jhjdshjhsj",
      Date: "06-06-2023",
      URLs: "hgdhg",
    },
  ];
  useEffect(() => {
    fetch("https://fmditital-1585723686.ap-south-1.elb.amazonaws.com/api/v1/user/userData", {
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
        handleprofileLinkingGetAll(data.data);
        // handlereleseInfoGetOne(data.data)

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
      `https://fmditital-1585723686.ap-south-1.elb.amazonaws.com/api/v1/createRelease/releseInfoGetOne/${userData.users_id}`,
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
  }

  function handleProfileLinkinAdudiogGet() {
    // console.log("userData.user_id",userData);
    fetch(
      `https://fmditital-1585723686.ap-south-1.elb.amazonaws.com/api/v1/tools/profileLinkinAdudiogGet/users_id/${releseInfoGetOne.users_id}/releseInfo_id/${releseInfoGetOne.releseInfo_id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("releseInfoGetOne ---------", data.data);
        setprofileLinkinAdudiogGet(data.data);
      });
  }
  function handleprofileLinkingGetAll(userData) {
    // console.log("userData.user_id",userData);
    fetch(
      `https://fmditital-1585723686.ap-south-1.elb.amazonaws.com/api/v1/tools/profileLinkingGetAll/${userData.users_id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("releseInfoGetOne ---------", data.data);
        setprofileLinkingGetAll(data.data);
      });
  }
  // console.log("formData", formData);
  const handleSubmit = async (e) => {
    fetch("https://fmditital-1585723686.ap-south-1.elb.amazonaws.com/api/v1/tools/profileLinkingPost", {
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
        FecebookLink: formData.FecebookLink,
        InstagramLink: formData.InstagramLink,
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
        <h3 className="catalogs">Profile Linking</h3>
        <div className="flex-container1">
          <div className="youtube">
            <label className="lable">Select release*</label>

            <select
              className="form-select"
              // value={formData.PasteURL}
              onClick={handlereleseInfoGetOne}
              onChange={(event) =>
                setformData((prev) => ({
                  ...prev,
                  Selectrelease: event.target.value,
                }))
              }
            >
              <option value="">Select an option</option>
              <option value={releseInfoGetOne.ReleaseTitle}>
                {releseInfoGetOne.ReleaseTitle}
              </option>
            </select>
            <label className="lable">Select platform*</label>

            <input
              type="url"
              className="form-control"
              placeholder="Make sure to enter the exact name of artist"
              // value={formData.PasteURL}
              onChange={(event) =>
                setformData((prev) => ({
                  ...prev,
                  Selectplatform: event.target.value,
                }))
              }
            ></input>
            <label className="lable">Instagram Link*</label>

            <input
              type="url"
              className="form-control"
              placeholder="Instagram Link"
              value={formData.InstagramLink}
              onChange={(event) =>
                setformData((prev) => ({
                  ...prev,
                  InstagramLink: event.target.value,
                }))
              }
            ></input>
          </div>
          <div className="label">
            <label className="lable">Select Audio*</label>
            <select
              className="form-select"
              // value={formData.SelectAudio}
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
              {/* <option value={ProfileLinkinAdudiogGet.map((item) => (item.Title))}>{ProfileLinkinAdudiogGet[0].Title}</option> */}
            </select>
            <label className="lable">Fecebook Link*</label>

            <input
              type="url"
              className="form-control"
              placeholder="Fecebook Link"
              value={formData.FecebookLink}
              onChange={(event) =>
                setformData((prev) => ({
                  ...prev,
                  FecebookLink: event.target.value,
                }))
              }
            ></input>

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
              <h3>Your Profile Linking History</h3>
            </div>
          </div>

          <table className="table1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Release Title</th>
                <th>Audio Title</th>
                <th>Artist</th>
                <th>FB</th>
                <th>IG</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {profileLinkingGetAll?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.Selectrelease}</td>
                  <td>{item.SelectAudio}</td>
                  <td>{item.Selectplatform}</td>
                  <td>{item.FecebookLink}</td>
                  <td>{item.InstagramLink}</td>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>{String(item.createdAt).slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProfileLinking;
