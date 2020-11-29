import React from 'react'
import '../assets/scss/button.scss'

export default ({play, isPlaying}) => {

    return (
        <div className='btn-container'>
            <div onClick={play} className={isPlaying ? 'btn-stop' : 'btn-play'}></div>
        </div>
    )
}