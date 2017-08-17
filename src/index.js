import _ from 'lodash'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list'
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_details';
const API_KEY = 'AIzaSyBv9n7B1BMLoXm305SRVACiDtWcFTaiFoE';



// creates a new component - component produces HTML

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
this.videoSearch('beaver eating wood')

  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    });
  }

  render() {

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

  return  (
    <div>
      <SearchBar onSearchTermChange={videoSearch}/>
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList
      onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
      videos={this.state.videos}/>
   </div>
    );
  }
}

// take this components generated HTML and put it on the page (in the DOM)


ReactDOM.render(<App />, document.querySelector('.container'))
