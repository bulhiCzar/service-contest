import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";


const SelectContest = () => {
    const [contests, setContests] = useState([])

    const loadContests = async () => {
        const res = await axios.get('/api/contest/')
        if (res.status !== 200) return
        setContests(res.data)
    }

    useEffect(() => {
        loadContests()
    }, [])

    return (
        <div className='container-xl'>
            <div className='row'>
                {
                    !contests.length ? 'Еще нет конкурсов' :
                        contests.map((item, idx) => {
                            return (
                                <NavLink to={'/contest/'+item._id} className='col-xl-3 col-md-10 border m-xl-3 p-3 text-decoration-none' key={idx}>
                                    <div className='text-uppercase fs-4 pointer'>{item.name}</div>
                                    <br/>
                                    <div className='fs-6'>{item.project}</div>
                                </NavLink>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default SelectContest