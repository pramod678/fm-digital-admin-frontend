import React, { useEffect, useState } from "react";
import "./Create-Release.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SideBar from "../components/Sidebar/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReleseInfo = () => {
  const navigate = useNavigate();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const [genreGet, setgenreGet] = useState([]);
  const [releseInfoGetOne, setReleseInfoGetOne] = useState([]);
  const [primaryArtistGet, setprimaryArtistGet] = useState([]);
  const [featuringArtistGet, setfeaturingArtistGet] = useState([]);
  const [userData, setUserData] = useState("");
  const [ImageDocument, setImageDocument] = useState({ preview: "", data: "" });
  const [releseInfoformData, setReleseInfosetformData] = useState({
    PrimaryArtist: "",
    FeaturingArtist: "",
    UPCEAN: "",
    CLine: "",
    PLine: "",
    ReleaseDate: "",
    LabelName: "",
    SubGenre: "",
    Genre: "",
    ReleaseTitle: "",
    ReleaseType: "",
    SpotifyId: "",
    AppleId: "",
  });
  console.log("genreGet", genreGet);
  // console.log("userData",userData);
  //   console.log("formData", releseInfoformData);
  //   console.log("primaryArtistGet", primaryArtistGet);
  const showToastMessageSucess = () => {
    toast.success("Success Message !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageError = () => {
    toast.error("Error Message !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    //   toast.success('Success Notification !', {
    //     position: toast.POSITION.TOP_RIGHT
    // });
    // toast.warning('Warning Notification !', {
    //     position: toast.POSITION.TOP_LEFT
    // });
    // toast.info('Information Notification !', {
    //     position: toast.POSITION.BOTTOM_CENTER
    // });
    // toast('Default Notification !', {
    //     position: toast.POSITION.BOTTOM_LEFT
    // });
    // toast('Custom Style Notification with css class!', {
    //      position: toast.POSITION.BOTTOM_RIGHT,
    // className: 'foo-bar'
    // });
  };
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
        setUserData(data.data);
        handlereleseInfoGetOne(data.data);
        handlegenregGet();
        if (data.data === "token expired") {
          alert("Token expired login again");
          localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);
  ////getuser
  function handlegenregGet() {
    fetch(`http://192.168.95.212:5000/api/v1/createRelease/genreGet`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("genere ---------", data.data);
        setgenreGet(data.data);
      });
  }
  function handlereleseInfoGetOne(userData) {
    fetch(
      `http://192.168.95.212:5000/api/v1/createRelease/releseInfoGetOne/${userData.users_id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("releseInfoGetOne ---------", data.data);
        setReleseInfoGetOne(data.data);
      });
  }
  console.log("releseInfoGetOne", releseInfoGetOne);

  function handleArtistGet() {
    fetch(
      `http://192.168.95.212:5000/api/v1/createRelease/primaryArtistGet/${userData.users_id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("Data ---------", data.data);
        setprimaryArtistGet(data.data);
      });
  }
  function handleFeacturingGet() {
    fetch(
      `http://192.168.95.212:5000/api/v1/createRelease/featuringArtisttGet/${userData.users_id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("Data ---------", data.data);
        setfeaturingArtistGet(data.data);
        // let items =[]
      });
  }
  // console.log("Genre", Genre);
  // console.log("inputFields", inputFields[0].PrimaryArtist);
  const handleSubmit1 = async (e) => {
    fetch("http://192.168.95.212:5000/api/v1/createRelease/primaryArtistPost", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        SpotifyId: releseInfoformData.SpotifyId,
        AppleId: releseInfoformData.AppleId,
        PrimaryArtist: releseInfoformData.PrimaryArtist,
        users_id: parseInt(userData.users_id),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "CreateSuccesfully");
        if (data.status === "ok") {
          showToastMessageSucess();
          handleClose1()
          // alert("Create Successful");
        } else {
          showToastMessageError();
          // alert("Something went wrong");
        }
      });
  };
  const handleSubmit2 = async (e) => {
    fetch(
      "http://192.168.95.212:5000/api/v1/createRelease/featuringArtisttPost",
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          SpotifyId: releseInfoformData.SpotifyId,
          AppleId: releseInfoformData.AppleId,
          FeaturingArtist: releseInfoformData.FeaturingArtist,
          users_id: parseInt(userData.users_id),
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "CreateSuccesfully");
        if (data.status === "ok") {
          showToastMessageSucess();
          handleClose2()
          // alert("Create Successful");
        } else {
          showToastMessageError();
          // alert("Something went wrong");
        }
      });
  };

  const handleSubmit = async (e) => {
    let formData = new FormData();
    formData.append("ImageDocument", ImageDocument.data);
    formData.append("ReleaseType", releseInfoformData.ReleaseType);
    formData.append("ReleaseTitle", releseInfoformData.ReleaseTitle);
    formData.append("PrimaryArtist", releseInfoformData.PrimaryArtist);
    formData.append("FeaturingArtist", releseInfoformData.FeaturingArtist);
    formData.append("Genre", releseInfoformData.Genre);
    formData.append("SubGenre", releseInfoformData.SubGenre);
    formData.append("LabelName", releseInfoformData.LabelName);
    formData.append("ReleaseDate", releseInfoformData.ReleaseDate);
    formData.append("PLine", releseInfoformData.PLine);
    formData.append("CLine", releseInfoformData.CLine);
    formData.append("UPCEAN", releseInfoformData.UPCEAN);
    formData.append("users_id", parseInt(userData.users_id));
    formData.append("Status", parseInt(0));
    formData.append("submission", "");
    const res = await fetch(
      "http://192.168.95.212:5000/api/v1/createRelease/releseInfoPost",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "CreateSuccesfully");
        if (data.status === "ok") {
          showToastMessageSucess();
          // alert("Create Successful");
          navigate("/Songsinfo");
        } else {
          // alert("Something went wrong");
          showToastMessageError();
        }
      });
  };
  const handleFileChange = (e) => {
    // console.log("handleFileChange");
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImageDocument(img);
    // console.log(img,"img");
  };
  var todayDate = new Date();
  var month = (todayDate.getMonth() + 1);
  var year = todayDate.getUTCFullYear() - 0;
  var tdate = (todayDate.getDate() + 5);
  if (month < 10) {
    month = "0" + month
  }
  if (tdate < 10) {
    tdate = "0" + tdate;
  }
  var maxDate = year + "-" + month + "-" + tdate;
  console.log("maxDate", maxDate);
  return (
    <>
      <div className="mai-nev">
        <Link className="button1" to="/ReleseInfo">
          Release Info
        </Link>
        <Link className="button1" to="/Songsinfo">
          Song Info
        </Link>
        <Link className="button1" to="/Platform">
          Platform
        </Link>
        <Link className="button1" to="/Submission">
          Submission
        </Link>
        <div>
          <div className="flex-container">
            <div>
              <div className="box">
                <img
                  style={{ height: 145, width: 145 }}
                  src={`http://localhost:5000/${releseInfoGetOne?.ImageDocument}`}
                  type="file"
                  alt="Art Work"
                ></img>
                <div className="ImageDocument">
                  <input
                    accept="image/*"
                    type="file"
                    name="ImageDocument"
                    onChange={handleFileChange}
                    required="true"
                  />
                </div>
              </div>

              <div className="GUIDELINES">
                <ul style={{ fontSize: "10px", marginLeft: "30%" }}>
                  {/* <h4>Use The lines in the box</h4> */}
                  <h6>Artwork Guidelines</h6>
                  <li>A minimum size of 3000 x 3000 pixels (a perfect square)</li>
                  <li>A minimum resolution of 72dpi (we recommend 300dpi)</li>
                  <li>RGB color mode (CMYK will not show up correctly)</li>
                  <li>JPEG file format</li>
                  <li>
                    Do not send us thumbnails, .png files or images smaller than
                    the requested size.”
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label className="lable">Release Type*</label>
              <div style={{ fontSize: "80%" }}>
                <select
                  className="optiontype"
                  name="work_days"
                  id="id_work_days"
                  required="true"
                  // value={ReleaseType}
                  onChange={(event) =>
                    setReleseInfosetformData((prev) => ({
                      ...prev,
                      ReleaseType: event.target.value,
                    }))
                  }
                  multiple
                >
                  <option value="EP">EP</option>
                  <option value="Single">Single</option>
                  <option value="Album">Album</option>
                  <option value="Compilation">Compilation</option>
                </select>
              </div>

              <label className="lable">Release Title*</label>
              <input
                type="text"
                required="true"
                className="form-control"
                placeholder="Release Title"
                id="ReleaseTitle"
                value={releseInfoformData.ReleaseTitle}
                onChange={(event) =>
                  setReleseInfosetformData((prev) => ({
                    ...prev,
                    ReleaseTitle: event.target.value,
                  }))
                }
              />

              <label className="lable">PrimaryArtist*</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  onClick={handleArtistGet}
                  required="true"
                  onChange={(event) =>
                    setReleseInfosetformData((prev) => ({
                      ...prev,
                      PrimaryArtist: event.target.value,
                    }))
                  }
                >
                  <option value="">Select an option</option>
                  {primaryArtistGet?.map((option) => (
                    <option key={option?._id} value={option?.PrimaryArtist}>
                      {option?.PrimaryArtist}
                    </option>
                  ))}
                </select>
              </div>
              <>
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    {/* <Modal.Title>PrimaryArtist</Modal.Title> */}
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Label>Primary Artist Name</Form.Label>
                      <Form.Control
                        value={releseInfoformData.PrimaryArtist}
                        required="true"
                        onChange={(event) =>
                          setReleseInfosetformData((prev) => ({
                            ...prev,
                            PrimaryArtist: event.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Primary Artist Name"
                        autoFocus
                      />
                      <Form.Label>Primary Artist Apple Id</Form.Label>
                      &nbsp;&nbsp;
                      <Form.Control
                        // value={releseInfoformData.AppleId}
                        required="true"
                        onChange={(event) =>
                          setReleseInfosetformData((prev) => ({
                            ...prev,
                            AppleId: event.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Primary Artist Apple Id"
                        autoFocus
                      />
                      <Form.Label>Primary Artist Spotify Id</Form.Label>
                      &nbsp;&nbsp;
                      <Form.Control
                        // value={releseInfoformData.SpotifyId}
                        required="true"
                        onChange={(event) =>
                          setReleseInfosetformData((prev) => ({
                            ...prev,
                            SpotifyId: event.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Primary Artist Spotify Id"
                        autoFocus
                      />
                      &nbsp;&nbsp;
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit1}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
              <button
                style={{
                  position: "relative",
                  top: "-9%",
                  left: "98%",
                  marginLeft: "-8%",
                  // marginTop: "-88px",
                }}
                className="btn btn-outline-success"
                onClick={handleShow1}
              // onClick={addInputField}
              >
                +
              </button>
              <label className="lable">FeaturingArtist*</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  required="true"
                  onClick={handleFeacturingGet}
                  onChange={(event) =>
                    setReleseInfosetformData((prev) => ({
                      ...prev,
                      FeaturingArtist: event.target.value,
                    }))
                  }
                >
                  <option value="">Select an option</option>
                  {featuringArtistGet?.map((option) => (
                    <option key={option?._id} value={option?.FeaturingArtist}>
                      {option?.FeaturingArtist}
                    </option>
                  ))}
                </select>
              </div>
              <>
                <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    {/* <Modal.Title>Add songs Details</Modal.Title> */}
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Label>Featuring Artist Name</Form.Label>
                      <Form.Control
                        value={releseInfoformData.FeaturingArtist}
                        required="true"
                        onChange={(event) =>
                          setReleseInfosetformData((prev) => ({
                            ...prev,
                            FeaturingArtist: event.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Featuring Artist Name"
                        autoFocus
                      />
                      <Form.Label>Featuring Artist Apple Id</Form.Label>
                      &nbsp;&nbsp;
                      <Form.Control
                        // value={releseInfoformData.AppleId}
                        required="true"
                        onChange={(event) =>
                          setReleseInfosetformData((prev) => ({
                            ...prev,
                            AppleId: event.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Featuring Artist Apple Id"
                        autoFocus
                      />
                      <Form.Label>Featuring Artist Spotify Id</Form.Label>
                      &nbsp;&nbsp;
                      <Form.Control
                        // value={releseInfoformData.SpotifyId}
                        required="true"
                        onChange={(event) =>
                          setReleseInfosetformData((prev) => ({
                            ...prev,
                            SpotifyId: event.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Primary Artist Spotify Id"
                        autoFocus
                      />
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit2}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
              <button
                style={{
                  position: "relative",
                  // marginTop: "-88px",
                  top: "-9%",
                  left: "98%",
                  marginLeft: "-8%",
                }}
                className="btn btn-outline-success"
                onClick={handleShow2}
              >
                +
              </button>
              <label className="lable">Genre*</label>
              <select
                type="text"
                required="true"
                className="form-select"
                placeholder="Genre"
                id="Genre"
                // value={Genre}
                onChange={(event) =>
                  setReleseInfosetformData((prev) => ({
                    ...prev,
                    Genre: event.target.value,
                  }))
                }
              >
                <option >Select an option</option>
                {genreGet?.map((option) => (
                  <option key={option?._id} value={option?.genre}>
                    {option?.genre}
                  </option>
                ))}
              </select>
              <label className="lable">Sub Genre*</label>
              <input
                type="text"
                required="true"
                className="form-control"
                placeholder="Sub Genre"
                id="SubGenre"
                value={releseInfoformData.SubGenre}
                onChange={(event) =>
                  setReleseInfosetformData((prev) => ({
                    ...prev,
                    SubGenre: event.target.value,
                  }))
                }
              />
            </div>
            <div className="label">
              <label className="lable">Label Name*</label>
              <input
                type="text"
                required="true"
                className="form-control"
                placeholder="Label Name"
                id="LabelName"
                value={releseInfoformData.LabelName}
                onChange={(event) =>
                  setReleseInfosetformData((prev) => ({
                    ...prev,
                    LabelName: event.target.value,
                  }))
                }
              />
              <label className="lable">Release Date*</label>
              <input
                type="date"
                required="true"
                className="form-control"
                placeholder="Release Date"
                id="ReleaseDate"
                min={maxDate}
                value={releseInfoformData.ReleaseDate}
                onChange={(event) =>
                  setReleseInfosetformData((prev) => ({
                    ...prev,
                    ReleaseDate: event.target.value,
                  }))
                }
              />
              <label className="lable">PLine*</label>
              <input
                type="text"
                required="true"
                className="form-control"
                placeholder="P line"
                id="PLine"
                value={releseInfoformData.PLine}
                onChange={(event) =>
                  setReleseInfosetformData((prev) => ({
                    ...prev,
                    PLine: event.target.value,
                  }))
                }
              />
              <label className="lable">C Line*</label>
              <input
                type="text"
                required="true"
                className="form-control"
                placeholder="C line"
                id="CLine"
                value={releseInfoformData.CLine}
                onChange={(event) =>
                  setReleseInfosetformData((prev) => ({
                    ...prev,
                    CLine: event.target.value,
                  }))
                }
              />
              <label className="lable">UPC/EAN</label>
              <input
                type="number"
                // required="true"
                className="form-control"
                placeholder="000000000001"
                id="UPCEAN"
                value={releseInfoformData.UPCEAN}
                onChange={(event) =>
                  setReleseInfosetformData((prev) => ({
                    ...prev,
                    UPCEAN: event.target.value,
                  }))
                }
              />
              <button
                onClick={() => handleSubmit()}
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReleseInfo;
