import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {InstantSearch,Hits,Pagination,Highlight,Configure,connectSearchBox } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';
import _ from 'lodash';

const client = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

class SearchBox extends Component {

  state = {
    value: this.props.currentRefinement
  };
  
  setSearch = _.debounce(value => {
    const {refine} = this.props;
    this.setState(refine(value))
}, 200)

  render() {
    console.log("this.props.currentRefinement",this.props.currentRefinement);
    return (
      <div className="searchbar"> 
      <input 
      onChange={e => {this.setSearch(e.target.value)}}
        placeholder="Search here..."
      />
      </div>
    );
  }
}

const DebouncedSearchBox = connectSearchBox(SearchBox);

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
      <InstantSearch  indexName="ikea" searchClient={client}>
          <div className="left-panel">
            <Configure hitsPerPage={18} />
          </div>
          <div className="right-panel">
          <DebouncedSearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}



function Hit(props) {
 
  return (
    <div>
      <img src={props.hit.image} className="image"  />
      <div >
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;



