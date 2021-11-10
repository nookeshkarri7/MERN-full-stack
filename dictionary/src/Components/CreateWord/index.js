import { Component } from "react"; //imports Component parent class from react
import axios from "axios"; //imports axios from axios to do api calls
import "./index.css"; //imports css styling

//creates a class components and extends Component class
class CreateWord extends Component {
  /*state is used store the values which varies everytime 
        word to store input box value,
        showMsg is used to show API succes/failure status
        showLoader to show loading while fetching data from backend

    */
  state = { word: "", showMsg: "", showLoader: false };

  /* This function is executed when user click add button */
  getDataFunction = async () => {
    //imports word from state
    const { word } = this.state;
    //check whether word not equal to empty or not
    if (word !== "") {
      //if word not empty,loader will be displayed in place of add button
      this.setState({ showLoader: true });
      //to get data from backend ,i used axios get call and given input word is converted to lowercase
      const data = await axios.get(
        `http://localhost:4000/create/${word.toLowerCase()}`
      );
      //it checks fetched data available or not
      if (data.data !== "Not available in dictionary") {
        const { sendWordData } = this.props; //it imports sendWordData method from Home component
        sendWordData(data); //it is a method to send data to home

        //after successfull data fetch loader,showMsg,word will be updated
        this.setState((prev) => ({
          showLoader: !prev.showLoader,
          showMsg: "Word added succesfully...",
          word: "",
        }));
      } else {
        //if data was not fetched it shows an error message
        this.setState((prev) => ({
          showLoader: !prev.showLoader,
          showMsg: "Not available in dictionary..Please try another word",
          word: "",
        }));
      }
    }
    //if word is empty,shows error message
    if (word === "") {
      this.setState({ showMsg: "Enter Valid Input" });
    }
  };

  render() {
    const { word, showMsg, showLoader } = this.state; //imports state variables
    return (
      <div className="addbutton-container">
        <label htmlFor="word">New Word</label>
        <input
          type="text"
          id="word"
          className="input"
          value={word}
          onChange={(e) => {
            this.setState({ word: e.target.value, showMsg: "" });
          }}
        />
        {showMsg && <p className="show-msg">{showMsg}</p>}

        <div className="buttons-container">
          <button className="button" data-dismiss="modal">
            Cancel
          </button>
          <button className="button" onClick={this.getDataFunction}>
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
  }
}

export default CreateWord;
