import { Component } from "react"; //imports Component parent class from react
import axios from "axios"; //imports axios from axios to do api calls

/*imports loader to show loading effect 
    while fetching data*/
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./index.css"; //imports css styles

class DetailedView extends Component {
  /*state is used store the values which varies everytime 
        wordsList to store fetched word data from backend,
        isLoading to show loading while fetching data from backend
    */
  state = { wordsList: [], isLoading: true };

  //it works only one time after render ,it doesnt rerenders data like state
  componentDidMount() {
    this.getData();
    //calls getData method
  }

  //used to get words list from backend based id parameter
  getData = async () => {
    const { id } = this.props.match.params; //id parameter from input url
    const response = await axios.get(
      `http://localhost:4000/word-details/${id}`
    );
    //updates state with response and shows detailed word description to user
    this.setState({ wordsList: response.data, isLoading: false });
  };

  //this method activated when user click close button
  goToHome = () => {
    const { history } = this.props;
    history.replace("/"); //it Redirects user to homepage
  };

  render() {
    const { wordsList, isLoading } = this.state;

    return (
      <div className="detailed-view-container">
        <div className="close-button-container">
          <button onClick={this.goToHome} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        {isLoading ? (
          <div className="loader-div">
            <Loader type="ThreeDots" color="#622547" height={80} width={80} />
          </div>
        ) : (
          <div>
            <h1 className="main-heading">{wordsList.title}</h1>
            <p className="para-low">{wordsList.lexicalCategory}</p>
            <p className="para-low">Origin {wordsList.etymologies}</p>
            <p className="para-bold">{wordsList.description}</p>
            <ul>
              <li className="para-bold">{wordsList.examples}</li>
            </ul>
            <hr />
            <p className="para-low">{wordsList.secondlexicalCategory}</p>
            <p className="para-bold">{wordsList.secondDefinition}</p>
            <ul>
              <li className="para-bold">{wordsList.secondExamples}</li>
              {wordsList.thirdExamples && (
                <li className="para-bold"> {wordsList.thirdExamples}</li>
              )}
            </ul>
            <hr />
          </div>
        )}
      </div>
    );
  }
}

export default DetailedView;
