"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const CommentInput = ({ anime_mal_id, user_email, username, anime_title }) => {
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [isCreated, setIsCreated] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    const handleInput = (event) => {
        setComment(event.target.value)
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value)
    }

    const handlePosting = async (event) => {
        event.preventDefault()

        setError("")

        const data = { anime_mal_id, user_email, comment, username, anime_title, comment_rating: parseInt(rating, 10) }

        try {
            const response = await fetch("/api/v1/comment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const postComment = await response.json()

            if (postComment.isCreated && comment.length >= 3) {
                setIsCreated(true)
                setComment("")
                setRating(0)
                router.refresh()
            } else {
                alert("Masukkan komentar lebih dari 3 huruf")
            }
        } catch (error) {
            setError(error.message)
            console.error("Error posting comment:", error)
        }
    }

    return (
        <div className="flex flex-row gap-3">
            {isCreated && <p className="text-color-primary">Postingan Berhasil Terkirim!</p>}
            {error && <p className="text-color-error">{error}</p>}

            <textarea 
                onChange={handleInput} 
                value={comment} 
                placeholder="Tulis komentar Anda di sini..." 
                className="bg-color-primary w-60 p-2" 
            />

            <input 
                type="number" 
                min="0" 
                max="5" 
                step="0.5" 
                value={rating} 
                onChange={handleRatingChange} 
                placeholder="Beri (0-5) Anime ini" 
                className="bg-color-primary w-60 p-2"
            />

            <button 
                onClick={handlePosting} 
                className="bg-color-accent w-60 rounded p-2"
            >
                Posting Komentar
            </button>
        </div>
    )
}

export default CommentInput;
