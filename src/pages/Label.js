import React, { useEffect, useState } from "react";
import "./Create-Release.css";
// import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FileUploader } from "react-drag-drop-files";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import SongsInfo from "./SongsInfo";
import Button from "react-bootstrap/Button";
import SideBar from "../components/Sidebar/SideBar";

const Label = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formdata, setFormdata] = useState({
    title: "",
    youtubeURL: "",
    labelDocument:""
  });
  const data = [
    {
      id: 1,
      Title: "hggsdhg",
      Status: "sonfgdg",
      Action: "jhjdshjhsj",
    },
    {
      id: 1,
      Title: "hggsdhg",
      Status: "sonfgdg",
      Action: "jhjdshjhsj",
    },
  ];
  const [userData, setUserData] = useState("");
  const [labelGet, setlabelGet] = useState([]);
  const [ImageDocument, setImageDocument] = useState({ preview: "", data: "" });
  console.log("labelGet", labelGet);
console.log(userData,"userData");
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
      handleLabelGet(data.data)
      if (data.data === "token expired") {
        alert("Token expired login again");
        localStorage.clear();
        window.location.href = "./sign-in";
      }
    });
}, []);
const handleSubmit = async (event) => {
  let formData = new FormData();
  formData.append("title", formdata.title);
  formData.append("youtubeURL", formdata.youtubeURL);
  formData.append("labelDocument", ImageDocument.data);

  // console.log("formData.Trackversion", formdata.Trackversion);
  const res = await fetch(
    "http://192.168.95.212:5000/api/v1/createRelease/labelPost",
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
function handleLabelGet() {
  fetch(
    `http://192.168.95.212:5000/api/v1/createRelease/labelgetAll`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log("genere ---------", data.data);
      setlabelGet(data.data);
    });
}

  const handleFileChange = (e) => {
    // console.log("handleFileChange");
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImageDocument(img);
    // console.log(img,"img");
  };
  return (
    <div className="mai-nev">
      <div style={{ position: "absolute", marginTop: "0px" }}>
        <SideBar />
      </div>
      <h3 className="catalogs">Add Label</h3>
      <div className="flex-container1">
        <div className="youtube">
          <button
            className="btn btn-default"
            style={{
              width: "40%",
              color: "red",
              borderRadius: "8px",
              borderColor: "black",
            }}
            type="submit"
            onClick={handleShow}
          >
            +&nbsp;Add Label
          </button>
        </div>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add songs Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    onChange={(event) =>
                      setFormdata((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }))
                    }
                    autoFocus
                  />
                  <br />
                  <Form.Label>Youtube URL</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Youtube URL"
                    onChange={(event) =>
                      setFormdata((prev) => ({
                        ...prev,
                        youtubeURL: event.target.value,
                      }))
                    }
                    autoFocus
                  />
                  <Form.Label>File</Form.Label>
                  <br />
                  <br />

                  <div className="labelImageDocument">
                    <input
                      accept="image/*"
                      type="file"
                      name="ImageDocument"
                      onChange={handleFileChange}
                      required="true"
                    />
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <table className="table2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {labelGet.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <input type="checkbox"></input>
                </td>
                <td>{item.youtubeURL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Label;
