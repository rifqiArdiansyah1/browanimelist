import Link from "next/link"
import InputSearch from "./InputSearch"
import UserActionButton from "./UserActionButton"

const NavBar = () => {
    return (
        <header className="bg-color-accent">
            <div className="flex md:flex-row flex-col justify-between md:items-center p-4">
                <Link href="/" className="font-bold text-2xl">BROWANIMELIST</Link>
                <InputSearch />
                <UserActionButton />
            </div>
        </header>
    )
}

export default NavBar