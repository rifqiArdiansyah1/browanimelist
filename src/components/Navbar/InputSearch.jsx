"use client"

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()

    const handleSearch = (event) => {
        if (event.key === "Enter" || event.type === "click") {
            event.preventDefault()
            const keyword = searchRef.current.value
            if (keyword.trim() === "") {
                alert("Masukkan Keyword Dahulu")
            } else {
                router.push(`/search/${keyword}`)
            }
        }

    }

    return (
        <div className="relative">
            <input
                placeholder="Cari Anime..."
                className="p-2 rounded w-full"
                ref={searchRef}
                onKeyDown={handleSearch}
            />
            <button className="absolute top-2 end-1" onClick={handleSearch}>
                <MagnifyingGlass size={24} />
            </button>
        </div>
    )
}

export default InputSearch