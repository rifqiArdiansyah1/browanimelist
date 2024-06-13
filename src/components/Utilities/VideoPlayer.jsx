"use client"

import { useState } from "react"
import YouTube from "react-youtube"

const VideoPlayer = ({ youtubeId }) => {
    const option = {
        width: "300",
        height: "250"
    }
    const [isOpen, setIsOpen] = useState(true)

    const buttonPlayer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const Player = () => {
        return (
            <div className="fixed bottom-2 right-2" >
                <button className="text-color-primary float-right text-color-primary bg-color-secondary px-3 mb-1"
                    onClick={buttonPlayer}>X</button>
                <YouTube
                    videoId={youtubeId}
                    onReady={(event) => event.target.pauseVideo()}
                    opts={option}
                />
            </div>
        )
    }
    const ButtonOpenPlayer = () => {
        return (
            <button className="fixed bottom-5 right-5 w-32 bg-color-primary hover:bg-color-accent rounded"
                onClick={buttonPlayer}>Tonton Cuplikan
            </button>
        )
    }

    return isOpen ? <Player /> : <ButtonOpenPlayer />

}

export default VideoPlayer