import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import Navbar from './navbar'
import StarRatingComponent from 'react-star-rating-component';

class App extends Component {
  state = {
    title : 'Title',
    authors : 'authors',
    publisher : 'Publisher',
    publishedDate : 'Date',
    pageCount : 'pages',
    isbn10 : 'isbn10',
    isbn13 : 'isbn13',
    averageRating : 0,
    search:false,
  };


  fetchBook = (data) => {

    var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + data;
    fetch(url)
    .then(response => response.json())
    .then (data => this.setBook(data.items))
    .catch(error => console.error('Error:', error))

    this.setState({
      search: false
    })
  };

setBook = (data) => {

  if (data === undefined || data === null) {
    alert("No data was found for this book in Google Books")
  }

  var book = data[0];
  this.setState({
    title : book.volumeInfo.title,
    authors : book.volumeInfo.authors,
    publisher : book.volumeInfo.publisher,
    publishedDate : book.volumeInfo.publishedDate,
    pageCount : book.volumeInfo.pageCount,
    isbn10 : book.volumeInfo.industryIdentifiers[1].identifier,
    isbn13 : book.volumeInfo.industryIdentifiers[0].identifier,
    averageRating : book.volumeInfo.averageRating,
  })
  var cover = ReactDOM.findDOMNode(this.refs.cover);
      cover.style.backgroundImage = "url("+book.volumeInfo.imageLinks.thumbnail+")";

};

isbntest10 = (input, array, check) => {
  var sum = 0; 

  for (var i = 0; i < array.length; i++) {

    sum += parseInt(((i+1) * array[i]), 10);

   }
  
  if (Math.abs(sum % 11) === parseInt(check, 10)) 
  {
    this.fetchBook(input);
  }
    else {
    alert("The isbn entered is not valid");
    
  }
};

isbntest13 = (input, array, check) => {
  var sum = 0; 
  for (var j = 0; j < array.length; j++) {
   if ( (j + 1) % 2 === 0) {
     sum += parseInt((3 * array[j]), 10);
   
   }

   else  {
     sum += parseInt((array[j]), 10);
   }
 }

 if (Math.abs((sum % 10) - 10) === parseInt((check), 10)) {
      this.fetchBook(input);     
    }
   else {

   alert("The isbn entered is not valid");
  }
};
 
validateISBN  = () => {
  var data = this.isbnInput.value;
  data = data.replace(/\s+/g, '');

  data = data.replace(/-/g, '');
  if (data.length === 10 || data.length === 13){
     const array1 = [...data];
     if(array1[9].toUpperCase() === 'X'){
      array1[9] = 10;
     }
     var checksum1 = array1.pop();
  if (array1.length === 9) {
    this.setState({isbn: data})
    this.isbntest10(data, array1, checksum1);
    }
  if (array1.length === 12) {
    this.setState({isbn: data})
    this.isbntest13(data, array1, checksum1);
    }
        
  }

  else {
    alert("You must enter a valid isbn");
  }
};

toggleSearch = () => {
  this.setState({search: !this.state.search})
};

  render() {
    const {title, authors, publisher, publishedDate, pageCount, isbn10, isbn13, averageRating, search} = this.state;
    return (
      <div>
      <Navbar
        className={'navbar'}
        label="book info"
        id="isbn"
        search={search}
        toggle={this.toggleSearch}
        validate={this.validateISBN}
        input={input => this.isbnInput = input}
        searchlabel="search by ISBN"
      />
     
      <div className={'container-fluid'}>
        <div className={'cover'} ref='cover'></div>
      </div> 
     
              <div className={'nfo'}>
                <div className={'left'}>
                  <label htmlFor="titlelabel">Title: </label>
                  <label htmlFor="authorlabel">Author: </label>
                  <label htmlFor="pageslabel"> # of pages: </label>
                  <label htmlFor="publisherlabel">Publisher: </label>
                  <label htmlFor="datelabel">Date Published: </label>
                  <label htmlFor="isbnlabel1">ISBN-10: </label>
                  <label htmlFor="isbnlabel2">ISBN-13: </label>
                  <label htmlFor="rating">Average Rating:</label>
                </div>
                <div className={'right'}>
                  <span><input type="text" readOnly value={title} id='title'/></span>
                 <span><input type="text" readOnly value={authors}/></span>
                 <span><input type="text" readOnly value={pageCount} id='pages'/></span>
                 <span><input type="text" readOnly value={publisher} id='publisher'/></span>
                 <span><input type="text" readOnly value={publishedDate} id='date'/></span>
                 <span><input type="text" readOnly value={isbn10} id='isbn10'/></span>
                 <span><input type="text" readOnly value={isbn13} id='isbn13'/></span>
                 <span><StarRatingComponent
                    className={'stars'} 
                    name="averageRating" 
                     editing={false}
                    starCount={5}
                    value={averageRating}
                  /></span>
                </div>
          </div>
      </div>
    );
  }
}

export default App;
