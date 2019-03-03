//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import dog from "./dog.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    dog,
    clickedDog: [],
    score: 0
  };

//when you click on a card ... the dog is taken out of the array
  imageClick = event => {
    const currentDog = event.target.alt;
    const DogAlreadyClicked =
      this.state.clickedDog.indexOf(currentDog) > -1;

//if you click on a dog that has already been selected, the game is reset and cards reordered
    if (DogAlreadyClicked) {
      this.setState({
        dog: this.state.dog.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedDog: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available dog, your score is increased and cards reordered
    } else {
      this.setState(
        {
          dog: this.state.dog.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedDog: this.state.clickedDog.concat(
            currentDog
          ),
          score: this.state.score + 1
        },
//if you get all 12 dogs corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              dog: this.state.dog.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedDog: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.dog.map(dog => (
            <FriendCard
              imageClick={this.imageClick}
              id={dog.id}
              key={dog.id}
              image={dog.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;