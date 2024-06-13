import Dashboard from "@/components/Dashboard/page"
import authUserSession from "@/libs/auth-libs"
import Image from "next/image"
import Link from "next/link"


const Page = async () => {
    const user = await authUserSession()

    return (
        <div className="flex flex-col justify-center items-center mt-8 text-color-primary">
            <h1 className="font-bold text-xl p-2">selamat datang, {user.name}</h1>
            <Image src={user.image} width={250} height={250} />
            <div className="m-3 flex gap-2 justify-center flex-wrap text-xl font-bold">
                <Link href="/users/dashboard/collection"
                    className="bg-color-accent text-color-dark p-2 rounded">
                    My Collection</Link>
                <Link href="/users/dashboard/comment"
                    className="bg-color-accent text-color-dark p-2 rounded">
                    My Comment</Link>
            </div>
            <Dashboard title={"Back To Home Page"} />
        </div>
    )
}

export default Page