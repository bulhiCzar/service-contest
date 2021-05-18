import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import React, {useContext, useRef, useState} from "react";
import s from './assets/styles/PhotoEditor.module.css'
import {Switch, Button} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import cn from 'classnames';
import axios from "axios";
import {toast} from "react-toastify";
import {AddCommitteeContext} from "./AddCommittee";


const PhotoEditor = ({
                         isCustomResize = false
                     }) => {

    const [image, setImage] = useState(null)
    const [state, setState] = useState({
        isSquare: true,
        allowZoomOut: false,
        position: {x: 0.5, y: 0.5},
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 200,
        height: 200,
        disableCanvasRotation: false,
        isTransparent: false,
        backgroundColor: null,
    })
    let editorRef = useRef(null)
    const setEditorRef = (editor) => {
        if (!editor) return
        editorRef = editor
    }

    const handleDrop = dropped => {
        setImage(dropped[0])
    }
    const handleNewImage = (e) => {
        setImage(e.target.files[0])
    }
    const handlePositionChange = (position) => {
        setState(prev => ({...prev, position}))
    }
    const handleScale = (e) => {
        const scale = parseFloat(e.target.value)
        setState(prev => ({...prev, scale}))
    }
    const handleWidth = (e) => {
        const width = parseInt(e.target.value)
        const update = {width}
        if (state.isSquare) {
            update.height = width
        }
        setState(prev => ({...prev, ...update}))
    }
    const handleHeight = (e) => {
        const height = parseInt(e.target.value)
        const update = {height}
        if (state.isSquare) {
            update.width = height
        }
        setState(prev => ({...prev, ...update}))
    }
    const handleIsSquare = (e) => {
        const isSquare = e.target.checked
        setState(prev => ({...prev, isSquare}))
    }
    const handleSave = async () => {
        const sendArr = []
        const img200 = editorRef.getImageScaledToCanvas().toDataURL()
        sendArr.push({
            size: '200x200',
            type: 'big',
            image: img200
        })

        setState(prev => ({...prev, width: 170, height: 170}))

        const img170 = editorRef.getImageScaledToCanvas().toDataURL()
        sendArr.push({
            size: '170x170',
            type: 'main',
            image: img170
        })
        try {
            for (const send of sendArr) {
                const res = await axios.post('/api/image', send)
                if (res.status !== 200) {
                    toast.error(res.data)
                } else {
                    // setCommittee(prev => ([res.data, ...prev]))
                }
            }
            toast('Фото добавлено')
        } catch (e) {
            toast.error('Ошибка загрузки фото')
        }
    }

    return (
        <div className={cn(
            'container bg-white',
            s.wrapper
        )}>
            <Dropzone
                onDrop={handleDrop}
                noClick
                noKeyboard
                maxFiles={1}
            >
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                        New File:
                        <input
                            name="newImage"
                            type="file"
                            onChange={handleNewImage}
                            {...getInputProps()}
                            style={{display: 'initial'}}
                        />

                        <br/>

                        <AvatarEditor
                            ref={setEditorRef}
                            image={image}
                            onPositionChange={handlePositionChange}
                            position={state.position}
                            scale={parseFloat(state.scale)}
                            width={state.width}
                            height={state.height}
                            className={s.canvas}
                        />
                    </div>
                )}
            </Dropzone>
            <br/>
            Zoom:
            <input
                name="scale"
                type="range"
                onChange={handleScale}
                min={state.allowZoomOut ? '0.1' : '1'}
                max="4"
                step="0.01"
                defaultValue="1"
            />
            <div className={s.resize} style={{display: !isCustomResize && 'none'}}>
                <Switch
                    checked={state.isSquare}
                    onChange={handleIsSquare}
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
                <div className={s.inputTwo}>
                    <input
                        name="width"
                        type="number"
                        onChange={handleWidth}
                        min="50"
                        max="400"
                        step="10"
                        value={state.width}
                    />
                    <input
                        width='50px'
                        name="height"
                        type="number"
                        onChange={handleHeight}
                        min="50"
                        max="400"
                        step="10"
                        value={state.height}
                    />
                </div>
            </div>
            <br/>
            <Button variant="contained" color="secondary" onClick={handleSave}>
                Загрузить
            </Button>
            <br/>
            {!!state.preview && (
                <img
                    src={state.preview.img}
                    style={{
                        borderRadius: `${
                            (Math.min(state.preview.height, state.preview.width) +
                                10) *
                            (state.preview.borderRadius / 2 / 100)
                        }px`,
                    }}
                />
            )}
            <div className='p-1 mb-4'/>
        </div>
    )
}

const PhotoEditorButton = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const handlerModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Button variant="contained" color="secondary" onClick={handlerModal}>
                Добавить фото
            </Button>
            <Modal
                open={isOpen}
                onClose={handlerModal}
            >
                <PhotoEditor
                    isCustomResize={props.isCustomResize}
                />
            </Modal>
        </>
    )
}

export default PhotoEditorButton