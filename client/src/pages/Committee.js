import React, {useEffect, useState} from "react"
import AddCommittee from "../components/AddCommittee";
import {toast} from "react-toastify";
import axios from "axios";
import Flag from "react-world-flags";
import CachedIcon from "@material-ui/icons/Cached";
import DoneIcon from "@material-ui/icons/Done";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CodeIcon from '@material-ui/icons/Code';
import Modal from "@material-ui/core/Modal";

const Committee = () => {
    const [committees, setCommittee] = useState([])
    const [modal, setModal] = useState({
        open: false, body: null
    })

    const getCommittee = async () => {
        try {
            const res = await axios.get('/api/committee/')
            if (res.status !== 200) {
                toast.error(res.data)
            } else {
                setCommittee(res.data)
            }
        } catch (e) {
            toast.error('Ошибка!')
        }
    }

    useEffect(() => {
        getCommittee()
    }, [])

    const getCode = async (id) => {
        // handleModal()
        let body = {}
        try {
            const res = await axios.get('/api/committee/' + id)
            if (res.status !== 200) {
                toast.error(res.data)
            } else {
                body = res.data
            }
        } catch (e) {
            toast.error('Ошибка!')
        }
        console.log(body)
        setModal({...modal, body, open: !modal.open})

        // JSON.stringify(data, undefined, 2);

    }

    const checkCommittee = async (_id, arrayId) => {
        try {
            const send = {
                status: 'done'
            }
            const res = await axios.put('/api/committee/' + _id, send)
            if (res.status !== 200) {
                toast.error(res.data)
            } else {
                committees[arrayId].status = 'done'
                setCommittee([...committees])
                toast('Успешное подтверждение')
            }
        } catch (e) {
            toast.error('Ошибка!')
        }
    }

    const deleteCommittee = async (id) => {
        const result = window.confirm("Вы дейтсвильно хотите удалить его?")
        if (!result) return
        try {
            const res = await axios.delete('/api/committee/' + id)
            if (res.status !== 200) {
                toast.error(res.data)
            } else {
                setCommittee(committees.filter((item) => item._id !== id))
            }
        } catch (e) {
            toast.error('Ошибка!')
        }
    }

    const handleModal = () => {
        setModal({...modal, open: !modal.open})
    }


    return (
        <div className='container-xl'>
            <div className='row'>
                <AddCommittee setCommittee={setCommittee}/>
            </div>
            <div className='row '>
                {
                    committees.map((item, idx) => {
                        return (
                            <div className='col-3 bg-light border-dark border p-3 ' key={item.idCommittee}>
                                <div className='row align-items-center mb-2'>
                                    <div className="col">
                                        {
                                            (item.status === 'await') ?
                                                <CachedIcon className='awaitFound'/>
                                                :
                                                <DoneIcon className='doneFound'/>
                                        }
                                    </div>
                                    <div className="col fw-bold"># {item.idCommittee}</div>
                                    <Flag className="col" code={item.country} height={20}
                                          fallback={<span>?!</span>}/>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">
                                        {item.name}
                                    </div>
                                </div>
                                <div className="row mb-2 ">
                                    <div className="col">
                                        {item.typeLink}
                                    </div>
                                    <a href={item.link} className="col">
                                        Сылка
                                    </a>
                                </div>
                                <div className='row mt-4 mb-1 align-items-center justify-content-end'>
                                    <CodeIcon className='col pointer' onClick={() => getCode(item._id)}/>
                                    {
                                        (item.status !== 'done') &&
                                        <>
                                            <CheckCircleIcon className='col pointer'
                                                             onClick={() => checkCommittee(item._id, idx)}/>
                                            <DeleteForeverIcon className='col pointer'
                                                               onClick={() => deleteCommittee(item._id)}/>
                                        </>
                                    }

                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Modal
                open={modal.open}
                onClose={handleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className='container-xl mt-5 bg-white p-5'>
                    <pre>
                        {JSON.stringify(modal.body, undefined, 3)}
                    </pre>
                </div>
            </Modal>
        </div>
    )
}

export default Committee