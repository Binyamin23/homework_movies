import React from 'react'
import Footer from './footer'
import Header from './header'
import VodList from './vodList'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import "./home.css"
import { useRef } from 'react'

const Home = () => {
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState("");
    const refSelect = useRef();

    let arrSelect = [];
    const changeArrSelect = () => {
        const years = new Date().getFullYear();
        for (let i = 0; i < 50; i++) {
            arrSelect[i] = years - i;
        }
    }
    changeArrSelect();

    const doApi = async (_searchQ) => {
        if (_searchQ) {
            let myUrl = `https://www.omdbapi.com/?s=${_searchQ}&y=${year}&apikey=3a61052c`;
            let { data } = await axios.get(myUrl);
            console.log(data);
            setAr(data.Search);
            setLoading(false)
        }
    }

    useEffect(() => {
        let searchQ = query.get("s") || "road";
        doApi(searchQ);
    }, [query, year])

    return (
        <React.Fragment>
            <Header/>
            <div className='container-fluid' style={{ backgroundColor: "black" }}>
                <div className='container p-2 border-bottom border-2'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid ">
                            <Link onClick={() => { setYear("") }} className="navbar-brand nav10">Top Years</Link>
                            <button className="navbar-toggler nav_button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link onClick={() => { setYear(1950) }} className="nav-link nav10" aria-current="page" to="#">1950</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={() => { setYear(1960) }} className="nav-link nav10" aria-current="page" to="#">1960</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={() => { setYear(1970) }} className="nav-link nav10" aria-current="page" to="#">1970</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={() => { setYear(1980) }} className="nav-link nav10" aria-current="page" to="#">1980</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={() => { setYear(1990) }} className="nav-link nav10" aria-current="page" to="#">1990</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={() => { setYear(2000) }} className="nav-link nav10" aria-current="page" to="#">2000</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={() => { setYear(2010) }} className="nav-link nav10" aria-current="page" to="#">2010</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={() => { setYear(2020) }} className="nav-link nav10" aria-current="page" to="#">2020</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className='p-2 col-6 col-md-4 col-lg-3 nav5'>
                        <select className='form-select text-center fs-4 nav2' size="1"  ref={refSelect} onChange={() => {
                            setYear(refSelect.current.value)
                        }}>   
                            <option className='nav3'>Select Year...</option>
                            {arrSelect.map(item => {
                                return (
                                    <option key={item} className='nav3' value={item}>{item}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='container-fluid' style={{ background: "black", minHeight: "55vh" }}>
                <div className='container'>
                    {loading ? <img src='images/giphy.gif' style={{ width: "100%", maxHeight: "300px" }}></img>
                        : ar ? < VodList vod_ar={ar} /> :
                            <h2 className='text-white display-5'>Not results...</h2>
                    }
                </div>
            </div>
            <Footer />
        
        </React.Fragment>
    )
}

export default Home




