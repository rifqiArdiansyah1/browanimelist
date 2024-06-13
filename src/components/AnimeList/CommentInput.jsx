"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const CommentInput = ({ anime_mal_id, user_email, username, anime_title }) => {
    const [comment, setComment] = useState("")
    const [isCreated, setIsCreated] = useState(false)

    const router = useRouter()

    const handleInput = (event) => {
        setComment(event.target.value)
    }

    const handlePosting = async (event) => {
        event.preventDefault()

        const data = { anime_mal_id, user_email, comment, username, anime_title }

        const response = await fetch("/api/v1/comment", {
            method: "POST",
            body: JSON.stringify(data)
        })
        const postComment = await response.json()
        if (postComment.isCreated && comment.length >= 3) {
            setIsCreated(true)
            setComment("")
            router.refresh()
        }
        else {
            alert("masukkan komentar lebih dari 3 huruf")
        }
        return
    }

    return (
        <>
            <div className="flex gap-3">
                {isCreated && <p className="text-color-primary">Postingan Berhasil Terkirim!</p>}

                <textarea onChange={handleInput} value={comment} className="bg-color-primary w-60" />
                <button onClick={handlePosting} className="bg-color-accent w-60 rounded" >Posting Komentar</button>
            </div>
        </>
    )
}


export default CommentInput;