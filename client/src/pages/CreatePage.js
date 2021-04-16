import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {useHistory} from "react-router-dom";


const CreatePage = () => {
    const history = useHistory()
    const [inputs, setInputs] = useState({
        name: '', project: '', prize: '',
    })
    const [prizes, setPrizes] = useState([])

    const handlerInput = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const addPrize = ()=>{
        if (!inputs.prize) return
        setPrizes([inputs.prize, ...prizes])
        setInputs({...inputs, prize: ''})
    }
    const delPrize = (id)=>{
        setPrizes(prizes.filter((_, idx)=>idx !== id))
    }

    const submit = async (e)=>{
        e.preventDefault()
        const {name, project} = inputs
        if(!name || !project || !prizes.length) return
        try {
            const res = await axios.post('/api/contest/',{name, project, prizes})
            if (res.status !== 200) throw new Error()
            history.push('/contest/'+res.data._id)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <form onSubmit={submit} className='container-xl' autoComplete="off">
            <div className='row mb-2'>
                <TextField label='Название' name='name' value={inputs.name} onChange={handlerInput}/>
                <TextField label="Проект" name='project' value={inputs.project} onChange={handlerInput}/>
                <TextField label="Вознаграждение" name='prize' value={inputs.prize} onChange={handlerInput} placeholder='Например: 1000 долей'/>
                <Button className='mt-3 mb-4' variant="contained" color="primary" onClick={addPrize}>Добавить</Button>

                {prizes.map((item, idx) => (
                    <div className='row mb-1' key={idx}>
                        <div className='col-10'>{item}</div>
                        <Button className='col-2' variant="contained" color='secondary' onClick={()=>delPrize(idx)}>Удалить</Button>
                    </div>
                ))}

            </div>
            <div className='row mt-5'>
                <Button variant="contained" color="primary" type='submit'>Создать конкурс</Button>
            </div>
        </form>
    )
}

export default CreatePage