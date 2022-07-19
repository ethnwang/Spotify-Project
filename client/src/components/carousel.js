import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
    // constructor(){
    //     super()
    //     this.state = {}
    // }
    state = {
        display: true,
        width: 100
    }
    // componentDidMount(){
    // fetch('./')
    //     .then((response) => {
    //     if(!response.ok) throw Error(response.statusText);
    //     return response.json()
    //     })
    //     .then((data) => {
    //     this.setState({
            
    //     });
    //     })
    // }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2>Some fun facts!</h2>
        <Slider {...settings}>
          <div>
            <h3>You listen to Joji at 8am the most</h3>
          </div>
          <div>
            <h3>You listen to Lewis Capaldi at 10am the most</h3>
          </div>
          <div>
            <h3>You listen to 88rising at 12pm the most</h3>
          </div>
          <div>
            <h3>You listen to Lauv at 2pm the most</h3>
          </div>
          <div>
            <h3>You listen to Sam Smith at 4pm the most</h3>
          </div>
          <div>
            <h3>You listen to Ed Sheeran at 6pm the most</h3>
          </div>
        </Slider>
      </div>
    );
  }
}