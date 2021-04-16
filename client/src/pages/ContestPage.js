import {useParams} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CircularProgress} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import parsePhoneNumber from 'libphonenumber-js'
import Flag from 'react-world-flags'
import {toast} from "react-toastify";


const ContestPage = () => {
    const {id} = useParams()
    const [info, setInfo] = useState(null)
    const [input, setInput] = useState('')
    const [selectors, setSelectors] = useState({
        prize: '', type: '',
    })
    const [number, setNumber] = useState(null)
    const [btnAdd, setBtnAdd] = useState({
        text: 'Добавить участника', color: "primary"
    })

    const getData = async (id) => {
        const res = await axios.get('/api/contest/' + id)
        if (res.status !== 200) {
            toast.error(res.data)
        } else {
            setInfo(res.data)
        }
    }

    useEffect(() => {
        getData(id)
    }, [id])

    const handlerInput = (e) => {
        let {value} = e.target
        if (selectors.type === 'phone') {
            if (!(/^[\d,+]*$/).test(value)) return
            const number = parsePhoneNumber(value)
            let saveBtnAdd = {
                text: 'Добавить участника',
                color: 'primary'
            }
            if (!number) {
                saveBtnAdd = {
                    text: 'Введите корректный номер',
                    color: 'secondary'
                }
            }
            setBtnAdd(saveBtnAdd)
            setNumber(number)
        }
        setInput(value)
    }
    const handleChange = e => {
        setSelectors({...selectors, [e.target.name]: e.target.value})
        switch (e.target.name) {
            case 'prize':
                break;
            case 'type':
                let saveBtnAdd = {
                    text: 'Добавить участника',
                    color: 'primary'
                }
                setBtnAdd(saveBtnAdd)
        }
    }

    const submit = async (e) => {
        e.preventDefault()
        if (!input || !selectors.type || !selectors.prize) return
        const res = await axios.post('/api/contest/' + info._id, {
            data: input,
            type: selectors.type,
            prizeId: selectors.prize
        })
        if (res.status !== 200) {
            toast.error(res.data)
        } else {
            const temp = info
            temp.infos.unshift(res.data)
            setInfo({...temp})
            toast('Запись добавлена')
        }
    }

    const delInfo = async (id) => {
        const res = await axios.put('/api/contest/' + info._id +'/'+id)
        if (res.status !== 200){
            toast.error(res.data)
        } else {
            const temp = info
            temp.infos = temp.infos.filter((item)=>item._id !== id)
            setInfo({...temp})
            toast('Запись удалена')
        }
    }

    if (!info) return <div className='container text-center'><CircularProgress/></div>
    return (
        <div className='container-xl'>
            <div className='mb-2 text-center bg-primary p-3 text-white'>
                {info.project} | {info.name}
            </div>
            <div>
                <form onSubmit={submit}>
                    <div className='row mb-2 mt-4'>
                        <div className='col-2'>
                            <InputLabel id="toPrize">Тип информации</InputLabel>
                            <Select
                                className='w-100'
                                name='type'
                                value={selectors.type}
                                onChange={handleChange}
                            >
                                <MenuItem value='login'>Логин</MenuItem>
                                <MenuItem value='phone'>Телефона</MenuItem>
                                <MenuItem value='any'>Другое</MenuItem>
                            </Select>
                        </div>
                        <TextField className='col-10' value={input} onChange={handlerInput}
                                   label='Добавить' name='name' placeholder='Добавить участника'
                                   InputProps={{
                                       startAdornment: ((selectors.type === 'phone') && number) &&
                                           <Flag code={number.country} height={20} fallback={<span>?!</span>}/>,
                                   }}
                        />
                    </div>
                    <Button className='row-12 mb-5 w-100' variant="contained"
                            color={btnAdd.color} type='submit'
                            disabled={!selectors.type || !selectors.prize || ((selectors.type === 'phone') && !number)}
                    >
                        {btnAdd.text}
                    </Button>
                </form>

                <div className='row'>
                    <div className='col-12'>
                        <InputLabel id="toPrize">Приз</InputLabel>
                        <Select
                            labelId='toPrize'
                            className='w-100'
                            name='prize'
                            value={selectors.prize}
                            onChange={handleChange}
                        >
                            {info.prizes.map((item, id) => {
                                return <MenuItem value={item._id}>{item.data}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <div className='col-12 mt-3'>
                        <div className='row'>
                            {info.infos.map((item, idx) => {
                                if (item.prizeId !== selectors.prize) return <></>
                                return (
                                    <div className='col-12 mb-3 border-bottom' key={idx}>
                                        <div className='row'>
                                            <div className='col-10'>{item.type}: {item.data}</div>
                                            <Button className='col-2' color='secondary'
                                                    onClick={() => delInfo(item._id)}>Удалить</Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContestPage