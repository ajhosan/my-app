import React, { useState } from 'react'
import './FindPlayer.css'

const FindPlayer = (props) => {
    const [search, setSearch] = useState('')
    const searchHandler = (event) => {
        setSearch(event.target.value);

        console.log(event)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault() // untuk menghentikan behavior defaut tag form (mematikan refresh otomatis ketikan di submit)
        // props.onFindPlayer(search)
        props.onSearchPlayer(search)
        // console.log(search);
        setSearch('')
    }

    return (
        <form className="form-search" onSubmit={handleSubmit}>
            <input 
                type="search" 
                className="search"
                placeholder="search..."
                name={'username'}
                value={search}
                onClick={() => {props.setSearching(false)}}
                onChange={searchHandler}
                // onKerPress untuk menonaktifkan submit data dengan tombol enter
                onKeyPress={e => {
                    if (e.key === 'Enter') e.preventDefault()
                    if (e.key === 'Enter') alert("press 'search' button to get your search results")
                }}
            />
            <input 
            type="submit" 
            className="button-search" 
            value="search" 
            />
        </form>
    )
}

export default FindPlayer