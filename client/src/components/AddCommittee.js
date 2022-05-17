import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {TextField} from "@material-ui/core";
import React, { memo, useState} from "react";
import countries from "countries-list"
import {Autocomplete} from '@material-ui/lab';
import Button from "@material-ui/core/Button";
import {toast} from "react-toastify";
import axios from "axios";
import PhotoEditor from "./PhotoEditor";
import {validateFullName} from "../utils/normalizeName";



const AddCommittee = ({setCommittee}) => {
    const [data, setData] = useState({
        country: '', name: '', typeLink: '', countryObj: null, link: '', imageBig: '', image: ''
    })


    const countryCodes = Object.keys(countries.countries);
    const countryNames = countryCodes.map(code => {
        countries.countries[code].key = code
        return countries.countries[code]
    });


    const handlerCountry = (e, value) => {
        const obj = value ? {country: value.key, countryObj: value} : {country: null, countryObj: null}
        setData({...data, ...obj})
    }
    const handlerName = (e) => {
        const fullName = validateFullName({fullName: e.target.value}).replaceToUpperCaseFirstSymbol()
        console.log(fullName)
        setData({...data, name: fullName})
    }
    const handlerTypeLink = (e) => {
        setData({...data, typeLink: e.target.value})
    }
    const handlerLink = (e) => {
        setData({...data, link: e.target.value})
    }
    const handlerAddPhoto = (idImage, options)=>{
        if ((options.w === 200) && (options.h === 200)) {
            setData(prev => ({...prev, imageBig: idImage}))
        }

        if ((options.w === 170) && (options.h === 170)) {
            setData(prev => ({...prev, image: idImage}))
        }
    }


    const AutocompleteCountry = memo(() => (
        <Autocomplete
            onChange={handlerCountry}
            value={data.countryObj}
            options={countryNames}
            getOptionLabel={(option) => option.emoji + ' ' + option.name}
            renderInput={(params) => <TextField {...params} label="Странна"/>}
        />
    ))

    const submit = async (e) => {
        e.preventDefault()
        if (!data.country || !data.name || !data.typeLink || !data.link) return

        const send = {
            country: data.country,
            name: data.name,
            typeLink: data.typeLink,
            link: data.link,
            imageBig: data.imageBig,
            image: data.image,
        }

        try {
            const res = await axios.post('/api/committee/', send)
            if (res.status !== 200) {
                toast.error(res.data)
            } else {
                setCommittee(prev => ([res.data, ...prev]))
                toast('Наблюдатель добавлен')
                setData({ country: '', name: '', typeLink: '', countryObj: null, link: '', imageBig: '', image: ''})
            }
        } catch (e) {
            toast.error('Ошибка!')
        }

    }

    return (
        <form onSubmit={submit}>
            <div className='row mb-2'>
                <div className='col-xl-3 mb-3'>
                    <AutocompleteCountry/>
                </div>
                <div className='col-xl-9 '>
                    <TextField
                        className='w-100'
                        value={data.name}
                        onChange={handlerName}
                        label='Имя Фамилия'
                        name='name'
                        placeholder='Введите...'
                    />
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-xl-3 mb-3'>
                    <InputLabel id="toInfo">Соц. сеть</InputLabel>
                    <Select
                        labelId='toInfo'
                        className='w-100'
                        name='type'
                        value={data.typeLink}
                        onChange={handlerTypeLink}
                    >
                        <MenuItem value='inst'>Инстаграм</MenuItem>
                        <MenuItem value='fb'>Facebook</MenuItem>
                        <MenuItem value='vk'>Вконтакте</MenuItem>
                        <MenuItem value='te'>Телеграм</MenuItem>
                        <MenuItem value='lin'>Linkedin</MenuItem>
                        <MenuItem value='wechat'>WeChat</MenuItem>
                    </Select>
                </div>
                <div className='col-xl-9'>
                    <TextField className='w-100' value={data.link} onChange={handlerLink}
                               label='Сылка' placeholder='Введите...'
                    />
                </div>
                <PhotoEditor
                    className='w-100'
                    isCustomResize={true}
                    onLoad={handlerAddPhoto}
                />
            </div>
            <div className='row mb-2 mt-4'>
                <div className="col">
                    <Button className='w-100' variant="contained"
                            color='primary' type='submit'
                            disabled={!data.name || !data.country || !data.typeLink || !data.link}
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default AddCommittee
