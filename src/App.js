import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {InstantSearch,Hits,Pagination,Highlight,Configure,connectSearchBox  } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const client = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

class SearchBox extends Component {
  timerId = null;

  state = {
    value: this.props.currentRefinement
  };

  onChangeDebounced = event => {
    const { refine, delay } = this.props;
    const value = event.currentTarget.value;
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => refine(value), delay);
    this.setState(() => ({
      value
    }));
  };
  render() {
    const value = this.state.value;
    return (
      <div className="searchbar"> 
      <input 
        value={value}
        onChange={this.onChangeDebounced}
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
          <DebouncedSearchBox delay={200} />
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



