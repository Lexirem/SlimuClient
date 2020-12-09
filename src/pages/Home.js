import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {animeList: []};
  }

  getAnimes = async () => {
    try{
    let array = [];
    let i = 0;
    while (i <=200){
    let animes = await axios.get(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${i}`);
    animes.data.data.map((datos) => array.push(datos.attributes));
    this.setState({
      animeList: array
    });
    i += 20;
    } 
    } catch(err) {
    console.log(err)
    }
  };

  componentDidMount(){
    this.getAnimes();
  }
    
  render(){
    console.log(this.state.animeList, "array")
    return (
      <div className="animeList"> 

        {this.state.animeList ? this.state.animeList.map((datos) => {
          return(
            <div>
              <img src={datos.posterImage.small} alt="anime cover" onClick=""/>
              {/* <h4>{datos.titles.en_jp}</h4>
              <h4>{datos.titles.ja_jp}</h4>
              <p>{datos.description}</p> */}
            </div>
          )
        }) : null
      }
      
      </div>
    )
  }
}

export default Home;