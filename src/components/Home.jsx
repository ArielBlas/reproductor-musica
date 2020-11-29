import React, { useState, useEffect,useRef } from 'react'
import SliderSlick from "react-slick";
import Slider from './Slider'
import ControlPanel from './ControlPanel';

export default ({songs}) => {
    const [music, setMusic] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef();

    const onChange = e => {
        const audio = audioRef.current
        audio.currentTime = (audio.duration/100) * e.target.value
        setPercentage(e.target.value)
    }

    const play = () => {
        const audio = audioRef.current;
        audio.volume = 0.1;

        if(!isPlaying){
            setIsPlaying(true)
            audio.play()
        }

        if(isPlaying){
            setIsPlaying(false)
            audio.pause()
        }
    }

    const getCurrDuration = e => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const pre = () => {
        setMusic(music => music-1)
        setIsPlaying(false)
        setPercentage(0)

        if(music == 0){
            setMusic(songs.length-1)
        }

    }

    const next = () => {
        setMusic(music => music+1)
        setIsPlaying(false)
        setPercentage(0)

        if(music == songs.length-1){
            setMusic(0)
        }

    }

    return (
        <>
    <div className='app-container'>
            <div className='song-container'>
                <div className='song-card'>
                    <img src={songs[music].img || 'https://images.unsplash.com/photo-1606440894295-8a79c32fdaf4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1534&q=80'} className='song-img'/>
                    <h3>{songs[music].name}</h3>
                    <p>{songs[music].author}</p>                        
                </div>
            </div>  
                       
            <div className='panel-home'>
            <Slider onChange={onChange} percentage={percentage}/>

            <audio ref={audioRef} src={songs[music].music}
                onLoadedData={e=>{
                    setDuration(e.currentTarget.duration.toFixed(2))
                }}
                onTimeUpdate={getCurrDuration}
            ></audio>

            <ControlPanel
                pre={pre}
                play={play}
                next={next}
                isPlaying={isPlaying}
                duration={duration}
                currentTime={currentTime}
            />
            </div>
        </div> 
        {/*
        <div className='app-bottom'>
            <p>like</p>
            <p>ver lista</p>
            <p>compartir</p>
        </div>*/}
        </>
    )
}
    