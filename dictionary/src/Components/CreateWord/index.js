import { useState } from "react";
import axios from "axios";
import "./index.css";
const CreateWord = (props) => {
  const [word, setWord] = useState("");
  const [showErr, setshowErr] = useState(false);
  const [showLoader, setshowLoader] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { sendWordData } = props;

  const getDataFunction = async () => {
    if (word !== "") {
      setshowErr(false);
      setshowLoader(true);
      const data = await axios.get(
        `http://localhost:4000/create/${word.toLowerCase()}`
      );

      if (data.status === 200) {
        sendWordData(data);
        setshowLoader(false);
        setshowErr(false);
        setShowSuccessMsg(true);
      } else {
        setshowErr(true);
      }
    }
    if (word === "") {
      setshowErr(true);
    }
  };

  return (
    <div className="addbutton-container">
      <label htmlFor="word">New Word</label>
      <input
        type="text"
        id="word"
        className="input"
        onChange={(e) => setWord(e.target.value)}
      />
      {showErr && <p>Enter Valid input</p>}
      {showSuccessMsg && <p>Word Added Succesfully</p>}
      <div className="buttons-container">
        <button className="button" data-dismiss="modal">
          Cancel
        </button>
        <button className="button" onClick={getDataFunction}>
          {showLoader ? (
            <img
              src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-28.jpg"
              alt="loading.."
              className="loading-gif"
            />
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateWord;
