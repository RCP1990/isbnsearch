import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Navbar(props) {
    if(props.search === true){
        return (
              <div 
                className={props.className + ' expanded'}
                style={props.style}
                >
                <h1 className={'app-name'}>{props.label}</h1>
          		<div className={'search-position'}>
          		  <label
          		    htmlFor="isbnValue">
          		    {props.searchlabel}:
          		  </label>
          		  <input type="search" 
          		     id={props.id}
          		     maxLength={20}
          		     required
          		     ref={props.input}
          		     />
          		     <FontAwesomeIcon className={'cta'} onClick={props.validate} icon={faSearch} />
          		</div>
               </div>
        )
      }
     else 
     	return (
     		<div 
             className={props.className}
             style={props.style}
             >
             <h1 className={'app-name'}>{props.label}</h1>
             <FontAwesomeIcon className={'cta'} onClick={props.toggle} icon={faSearch} /></div>
     	)
    }

export default Navbar