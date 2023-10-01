import React, { useEffect, useState } from "react";
import "./Create-Release.css";
import { Link,useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SideBar from "../components/Sidebar/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SongsInfo = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputFields, setInputFields] = useState([{ PrimaryArtist: "" }]);
  const [genreGet, setgenreGet] = useState([]);
  const [primaryArtistGet, setprimaryArtistGet] = useState([]);
  const [ReleseInfoGet, setReleseInfoGet] = useState([]);
  const [featuringArtistGet, setfeaturingArtistGet] = useState([]);
  const [languageGet, setLanguageGet] = useState([]);
  const [userData, setUserData] = useState("");
  const [formdata, setFormdata] = useState({
    AudioDocument:'',
    Trackversion: '',
    Instrumental:'',
    Title: '',
    VersionSubtitle: '',
    Primaryartist: '',
    FeaturingArtist: '',
    Author: '',
    Composer: '',
    Producer: '',
    Publisher: '',
    ISRC: '',
    Genre: '',
    Subgenre: '',
    ExplicitVersion: '',
    TrackTitleLanguage: '',
    LyricsLanguage: '',
    Lyrics: '',
    CallerTuneTiming: '',
    DistributeMusicvideo: '',
  });
  console.log("ReleseInfoGet",ReleseInfoGet);
  const [AudioDocument, setAudioDocument] = useState({ preview: "", data: "" });
  const handleFileChange = (e) => {
    // console.log("handleFileChange");
    const Audio = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setAudioDocument(Audio);
    // console.log(img,"img");
  };
// console.log("AudioDocument.data",AudioDocument.data);
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
      handlegenregGet()
      handleLanguageGet()
      handleReleseInfoGet(data.data)
      if (data.data === "token expired") {
        alert("Token expired login again");
        localStorage.clear();
        window.location.href = "./sign-in";
      }
    });
}, []);
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
// console.log("userData.users_id",userData.users_id);
function handleReleseInfoGet(userData) {
  fetch(
    `http://192.168.95.212:5000/api/v1/createRelease/releseInfoGetOne/${userData.users_id}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log("Datareleseinfo ---------", data.data);
      setReleseInfoGet(data.data);
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
function handlegenregGet() {
  fetch(
    `http://192.168.95.212:5000/api/v1/createRelease/genreGet`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log("genere ---------", data.data);
      setgenreGet(data.data);
    });
}
function handleLanguageGet() {
  fetch(
    `http://192.168.95.212:5000/api/v1/createRelease/languageGet`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log("genere ---------", data.data);
      setLanguageGet(data.data);
    });
}
  const handleSubmit = async (event) => {
    let formData = new FormData();
    formData.append("AudioDocument", AudioDocument.data);
    formData.append("Trackversion", formdata.Trackversion);
    formData.append("Instrumental", formdata.Instrumental);
    formData.append("Title", formdata.Title);
    formData.append("VersionSubtitle", formdata.VersionSubtitle);
    formData.append("Primaryartist", formdata.Primaryartist);
    formData.append("FeaturingArtist", formdata.FeaturingArtist);
    formData.append("Author", formdata.Author);
    formData.append("Composer", formdata.Composer);
    formData.append("Producer", formdata.Producer);
    formData.append("Publisher", formdata.Publisher);
    formData.append("ISRC", formdata.ISRC);
    formData.append("Genre", formData.Genre);
    formData.append("Subgenre", formdata.Subgenre);
    formData.append("ExplicitVersion", formdata.ExplicitVersion);
    formData.append("TrackTitleLanguage", formdata.TrackTitleLanguage);
    formData.append("LyricsLanguage", formdata.LyricsLanguage);
    formData.append("Lyrics", formdata.Lyrics);
    formData.append("CallerTuneTiming", formdata.CallerTuneTiming);
    formData.append("DistributeMusicvideo", formdata.DistributeMusicvideo);
    formData.append("users_id",parseInt(userData.users_id));
    formData.append("releseInfo_id",parseInt(ReleseInfoGet.releseInfo_id));
    // console.log("formData.Trackversion", formdata.Trackversion);
    const res = await fetch(
      "http://192.168.95.212:5000/api/v1/createRelease/songsInfoPost",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((Data) => {
        console.log(Data, "CreateSuccesfully");
        if (Data.status === "ok") {
          alert("Create Successful");
          handleClose()
          // navigate('/Platform')
        } else {
          // navigate('/Songsinfo')
          alert("Something went wrong");
          // console.log("Something went wrong");
        }
      });
  };
  const handleSubmit1 = async (event) => {
    navigate('/Platform')
 
  };

  //////add songs function
  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        PrimaryArtist: "",
      },
    ]);
  };

  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
console.log(languageGet,"remove");
  return (
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
      <div style={{ position: "absolute", marginTop: "-30px" }}>
        <SideBar />
      </div>

      <div className="songuploging">
        <div className="GUIDELINES2">
          <ul style={{ fontSize: "12px",marginLeft:"30%" }}>
            {/* <h4>Use The lines in the box</h4> */}
            <h6>AUDIO GUIDELINES </h6>
            <li>Format: mp3 or wav</li>
            <li>Requirements: Minimum of 16 bit, 44.1 Khz, stereo.</li>
            <li>Recommended 24 bits, 48Khz or 24 bits 96Khz.</li>
            <li>File size: 95 MB</li>
          </ul>
        </div>
        {inputFields.map((data, index) => {
          const { PrimaryArtist, emailAddress, salary } = data;
          return (
            <div className="row my-3" key={index}>
              <div className="col-sm-11">
                <Button
                  className="formbutton"
                  variant="primary"
                  onClick={handleShow}
                >
                  Add Song Details
                </Button>
                <div className="AudioDocumentsongs">
                  <input
                    accept="audio/*"
                    type="file"
                    name="AudioDocument"
                    onChange={handleFileChange}
                    // onChange={(event) => setFormdata(prev => ({...prev, AudioDocument: event.target.value }))}
                    multiple
                  />
                </div>
                <button
                  style={{
                    position: "relative",
                    marginTop: "-40px",
                    left: "70%",
                  }}
                  className="btn btn-outline-success"
                  onClick={addInputField}
                >
                  +
                </button>
              </div>

              <div className="Addclosebutton2">
                {inputFields.length !== 1 ? (
                  <button
                    className="btn btn-outline-danger"
                    onClick={removeInputFields}
                  >
                    x
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* <Button className="formbutton" variant="primary" onClick={handleShow}>
        Add Song Details
      </Button> */}

      <>
        <Modal.Title
          style={{
            position: "relative",
            marginTop: "40px",
            marginLeft: "20px",
          }}
        >
          Upload Assets
        </Modal.Title>
        {/* <h5 style={{marginRight:'560px',color:'blue',marginTop:'150px',position:'relative'}}>AUDIO FILE GUDELINES</h5> */}

        <Modal show={show } onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{marginTop:"10px"}}>Add songs Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Track version*</Form.Label>
              <div>
                <input
                  class="form-check-input"
                  type="radio"
                  value="Original"
                  onChange={(event) => setFormdata(prev => ({...prev, Trackversion: event.target.value }))}
                  name="flexRadioDefault"
                  id="flexRadioDefault"
                  required
                />
                &nbsp;&nbsp;
                <label class="form-check-label" for="flexRadioDefault1">
                  Original
                </label>
                &nbsp;&nbsp;
                <input
                  class="form-check-input"
                  type="radio"
                  value="karaoke"
                  onChange={(event) => setFormdata(prev => ({...prev, Trackversion: event.target.value }))}
                  name="flexRadioDefault"
                  id="flexRadioDefault"
                />
                &nbsp;&nbsp;
                <label class="form-check-label" for="flexRadioDefault1">
                  karaoke
                </label>
                &nbsp;&nbsp;
                <input
                  class="form-check-input"
                  type="radio"
                  value="Melody"
                  onChange={(event) => setFormdata(prev => ({...prev, Trackversion: event.target.value }))}
                  name="flexRadioDefault"
                  id="flexRadioDefault"
                />
                &nbsp;&nbsp;
                <label class="form-check-label" for="flexRadioDefault1">
                  Melody
                </label>
                &nbsp;&nbsp;
                <input
                  class="form-check-input"
                  type="radio"
                  value="Cover"
                  onChange={(event) => setFormdata(prev => ({...prev, Trackversion: event.target.value }))}
                  name="flexRadioDefault"
                  id="flexRadioDefault"
                />
                &nbsp;&nbsp;
                <label class="form-check-label" for="flexRadioDefault1">
                  Cover
                </label>
              </div>
              <Form.Label>Instrumental*</Form.Label>
              <div>
                <input
                  class="form-check-input"
                  type="radio"
                  value="Yes"
                  onChange={(event) => setFormdata(prev => ({...prev, Instrumental: event.target.value }))}
                  name="flexSwitchCheckDefault"
                  id="flexSwitchCheckDefault"
                  required
                />
                &nbsp;&nbsp;
                <label class="form-check-label" for="flexRadioDefault1">
                  Yes
                </label>
                &nbsp;&nbsp;
                <input
                  class="form-check-input"
                  type="radio"
                  value="No"
                  onChange={(event) => setFormdata(prev => ({...prev, Instrumental: event.target.value }))}
                  name="flexSwitchCheckDefault"
                  id="flexSwitchCheckDefault"
                />
                &nbsp;&nbsp;
                <label class="form-check-label" for="flexRadioDefault1">
                  No
                </label>
              </div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title*</Form.Label>
                <Form.Control 
                value={formdata.Title}
                onChange={(event) => setFormdata(prev => ({...prev, Title: event.target.value }))}
                type="text" placeholder="Title"  required/>
                <Form.Label>Version/Subtitle</Form.Label>
                <Form.Control 
                value={formdata.VersionSubtitle}
                onChange={(event) => setFormdata(prev => ({...prev, VersionSubtitle: event.target.value }))}
                  type="text"
                  placeholder="Version Subtitle"
                />
                <Form.Label>Primary artist*</Form.Label>
                <select
                  className="form-select"
                  onClick={handleArtistGet}
                  onChange={(event) => setFormdata(prev => ({...prev, Primaryartist: event.target.value }))}
                  required >
                    <option value="">Select an option</option>
                {primaryArtistGet?.map((option) => (
                  <option key={option?._id} value={option?.PrimaryArtist}>
                    {option?.PrimaryArtist}
                  </option>
                ))}
                </select>
                <Form.Label>Featuring Artist</Form.Label>
                <select
                  className="form-select"
                  onClick={handleFeacturingGet}
                  onChange={(event) => setFormdata(prev => ({...prev, FeaturingArtist: event.target.value }))}
                >
                       <option value="">Select an option</option>
                {featuringArtistGet?.map((option) => (
                  <option key={option?._id} value={option?.FeaturingArtist}>
                    {option?.FeaturingArtist}
                  </option>
                ))}
                </select>
                <Form.Label>Author*</Form.Label>
                <Form.Control 
                value={formdata.Author}
                onChange={(event) => setFormdata(prev => ({...prev, Author: event.target.value }))}
                type="text" placeholder="Author"  required/>
                <Form.Label>Composer*</Form.Label>
                <Form.Control 
                value={formdata.Composer}
                onChange={(event) => setFormdata(prev => ({...prev, Composer: event.target.value }))}
                type="text" placeholder="Composer"  required/>
                <Form.Label>Producer*</Form.Label>
                <Form.Control 
                value={formdata.Producer}
                onChange={(event) => setFormdata(prev => ({...prev, Producer: event.target.value }))}
                type="text" placeholder="Producer"  required/>
                <Form.Label>Publisher*</Form.Label>
                <Form.Control 
                value={formdata.Publisher}
                onChange={(event) => setFormdata(prev => ({...prev, Publisher: event.target.value }))}
                type="text" placeholder="Publisher"  required/>
              </Form.Group>
              <Form.Label>Have your own ISRC (Optional)</Form.Label>
              <Form.Control 
              value={formdata.ISRC} 
              onChange={(event) => setFormdata(prev => ({...prev, ISRC: event.target.value }))}
              type="text" placeholder="ISRC" ISRC />
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Genre*</Form.Label>
                <select
                  className="form-select"
                  onChange={(event) => setFormdata(prev => ({...prev, Genre: event.target.value }))}
                  required >
                        <option value="">Select an option</option>
                {genreGet?.map((option) => (
                  <option key={option?._id} value={option?.genre}>
                    {option?.genre}
                  </option>
                ))}
                </select>

                <Form.Label>Sub genre</Form.Label>
                <Form.Control 
                value={formdata.Subgenre}
                onChange={(event) => setFormdata(prev => ({...prev, Subgenre: event.target.value }))}
                type="text" placeholder="Sub genre"  />
                <Form.Label>Explicit Version*</Form.Label>
                <div>
                  <input
                    class="form-check-input"
                    type="radio"
                    value="Yes"
                    onChange={(event) => setFormdata(prev => ({...prev, ExplicitVersion: event.target.value }))}
                    name="btn-check"
                    id="btn-check"
                    required/>
                  &nbsp;&nbsp;
                  <label class="form-check-label" for="flexRadioDefault1">
                    Yes
                  </label>
                  &nbsp;&nbsp;
                  <input
                    class="form-check-input"
                    type="radio"
                    value="No"
                    onChange={(event) => setFormdata(prev => ({...prev, ExplicitVersion: event.target.value }))}
                    name="btn-check"
                    id="btn-check"
                  />
                  &nbsp;&nbsp;
                  <label class="form-check-label" for="flexRadioDefault1">
                    No
                  </label>
                  &nbsp;&nbsp;
                  <input
                    class="form-check-input"
                    type="radio"
                    value="Cleaned"
                    onChange={(event) => setFormdata(prev => ({...prev, ExplicitVersion: event.target.value }))}
                    name="btn-check"
                    id="btn-check"
                  />
                  &nbsp;&nbsp;
                  <label class="form-check-label" for="flexRadioDefault1">
                    Cleaned
                  </label>
                </div>
              </Form.Group>
              <Form.Label>Track Title Language*</Form.Label>
              <select
                className="form-select"
                onChange={(event) => setFormdata(prev => ({...prev, TrackTitleLanguage: event.target.value }))}
                required >
                        <option value="">Select an option</option>
                {languageGet?.map((option) => (
                  <option key={option?._id} value={option?.language}>
                    {option?.language}
                  </option>
                ))}
              </select>
              <Form.Label>Lyrics Language</Form.Label>
              <select
                className="form-select"
                onChange={(event) => setFormdata(prev => ({...prev, LyricsLanguage: event.target.value }))}
              >
                            <option value="">Select an option</option>
                {languageGet?.map((option) => (
                  <option key={option?._id} value={option?.language}>
                    {option?.language}
                  </option>
                ))}
              </select>
              <Form.Label>Lyrics</Form.Label>
              <Form.Control 
              value={formdata.Lyrics}
                  onChange={(event) => setFormdata(prev => ({...prev, Lyrics: event.target.value }))}
              type="text" placeholder="Lyrics"  />
              <Form.Label>Caller Tune Timing</Form.Label>
              <Form.Control 
              value={formdata.CallerTuneTiming}
              onChange={(event) => setFormdata(prev => ({...prev, CallerTuneTiming: event.target.value }))}
              type="time" placeholder="hh:mm:ss"  />
              <Form.Label>Distribute Music video?</Form.Label>
              <Form.Control
              value={formdata.DistributeMusicvideo}
              onChange={(event) => setFormdata(prev => ({...prev, DistributeMusicvideo: event.target.value }))}
                type="text"
                placeholder="Distribute Music video URL"
                Distribute
                Music
                video
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Button style={{position:"relative",marginTop:"32%",marginLeft:"75%"}} disabled={!formdata.Title || !formdata.TrackTitleLanguage} variant="primary" onClick={handleSubmit1} >
              Next Save
            </Button>
    </div>
    
  );
  
};

export default SongsInfo;
