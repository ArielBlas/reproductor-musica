import React from 'react'
import Button from './Button'
import '../assets/scss/control-panel.scss'
import BackPlay from '../assets/svg/back.svg';
import NextPlay from '../assets/svg/next.svg';


export default ({pre, play, next, isPlaying, duration, currentTime}) => {
    const secondsToHms = seconds => {
        if(!seconds) return '00m 00s'

        let duration = seconds
        let hours = duration / 3600
        duration = duration % 3600

        let min = parseInt(duration/60)
        duration = duration % 60
        
        let sec = parseInt(duration)

        if(sec < 10){
            sec = `0${sec}`
        }
        if(min < 10){
            min = `0${min}`
        }

        if(parseInt(hours, 10) > 0){
            return `${parseInt(hours, 10)}h ${min}m ${sec}s`
        } else if(min == 0){
            return `00m ${sec}s`
        } else {
            return `${min}m ${sec}s`
        }
    }

    return (
        <div className='control-panel'>
            <div className='timer'>{secondsToHms(currentTime)}</div>
            <img src={BackPlay} onClick={pre} className='control-icons'/>
            
            <Button play={play} isPlaying={isPlaying}/>
            
            <img src={NextPlay} onClick={next}className='control-icons'/>   
            
            <div className='timer'>{secondsToHms(duration)}</div>
        </div>
    )
}