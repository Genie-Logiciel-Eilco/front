import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/templogo.jpg";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton'
import "./BrowseNavbar.scss";
import bookService from "../../service/booksService";

function BrowseNavbar() {
     const keys=[
        {
            name:"Tous",
            value:"all"
        },
        {
            name:"ISBN",
            value:"isbn"
        },
        {
            name:"Titre",
            value:"name"
        },
        {
            name:"Description",
            value:"synopsis"
        },
        {
            name:"Date de publication",
            value:"publicationDate"
        },
        {
            name:"Auteur",
            value:"author"
        },
        {
            name:"Editeur",
            value:"publisher"
        },
        {
            name:"Categorie",
            value:"category"
        }
    ]
    const history=useHistory();
    const [navToggle, setNavToggle] = useState(false);
    const [isActive,setIsActive]=useState(false);
    const [notFound,setNotFound]=useState(false);
    const [isSearching,setIsSearching]=useState(false);
    const [isReady,setIsReady]=useState(false);
    const [defaultx,setDefaultx]=useState(0);
    const [searchValue,setSearchValue]=useState("");
    const [books,setBooks]=useState([]);
    const toggleChange=(e)=>{
        console.log(e.target.innerHTML);
        setIsActive(!isActive);
        resetSearch();
    };
    const setDefaultKey=(id)=>{
        console.log(id);
        setDefaultx(id);
    }
    const changeSearchValue=async (e)=>{
        const value=e.target.value;
        setSearchValue(value);
        if(value.length>0)
        {
            setIsSearching(true);
            setIsActive(false);
            const data={
                [keys[defaultx].value]:value,
                paginate:false
            }
            let resp=await bookService.searchBooks(data);
            let books = await resp.data.data;
            if(books.length==0)
            {
                setNotFound(true)
            }
            else
            {
                setNotFound(false)
            }
            setIsReady(true);
            setBooks(books);
        }
        else
        {
            setIsSearching(false);
            setIsReady(false);
        }
        
    }
    const resetSearch=()=>{
        setSearchValue("");
        setIsSearching(false);
        setIsReady(false);
    }
    const handleCLick=($uuid)=>{
        history.push(`/books/${$uuid}`)
    }
   
    return (
        <nav className="nav">
            <div className="nav-container">
                <div className="nav__logo">
                    <Link to="/" className="link">
                        <img src={logo} alt="" className="nav__logo-img" />
                    </Link>
                </div>

                <div className="nav__searchBox">
                    <div className="nav__searchBox-keysDropdown">
                        <div className="default_option" onClick={toggleChange}>{keys[defaultx].name}</div>  
                        {isActive && (
                        <ul className="active">
                            {keys.map((key,index)=>(
                                <li className={defaultx==index?"activeKey":""} onClick={()=>setDefaultKey(index)}>{key.name}</li>
                            ))}
                        </ul>)} 
                    </div>
                    {isSearching && !isReady && (
                        
                        <div className="nav__searchBox-booksDropdown">
                            <>
                             <Skeleton className="skeleton" variant="h1" />
                             <Skeleton className="skeleton" variant="h1"/>
                             <Skeleton className="skeleton" variant="h1"/>
                             <Skeleton className="skeleton" variant="h1"/>
                             <Skeleton className="skeleton" variant="h1"/>
                            </>
                        </div>
                    )}
                    {isSearching && isReady && notFound &&(
                        
                        <div className="nav__searchBox-booksDropdown">
                            <h2>Not found</h2>
                        </div>
                    )}
                    {isSearching && isReady && !notFound &&
                    (
                        <div className="nav__searchBox-booksDropdown">
                            {books.map((book)=>(
                                <div className="item" onClick={()=>handleCLick(book.id)}>
                                <img src={`http://104.248.39.111/images/${book.imageLocation}`} alt="" srcset="" />
                                <h3>{book.name}</h3>
                                </div>
                            ))}
                        </div>

                    )}

                    <input
                        value={searchValue}
                        onChange={changeSearchValue}
                        className="nav__searchBox-input"
                        placeholder="Search"
                    />
                    {!isReady && (
                    <FontAwesomeIcon
                    icon={faSearch}
                    className="nav__searchBox-icon"
                    />)}
                    {isReady && (
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="nav__searchBox-icon"
                        onClick={resetSearch}
                    />)
                    }

                </div>

                <div
                    className="nav__toggle hide-for-desktop"
                    onClick={() => setNavToggle(!navToggle)}
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className="nav__toggle-btn"
                    />
                </div>

                <ul
                    className={
                        navToggle ? "nav__links open" : "nav__links close"
                    }
                >
                    <li>
                        <Link to="/books" className="nav__links-item">
                            Explorer
                        </Link>
                    </li>
                    <li>
                        <Link to="/books/favorites" className="nav__links-item">
                            Favoris
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" className="nav__links-item logout">
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default BrowseNavbar;