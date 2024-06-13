import authUserSession from "@/libs/auth-libs"
import Link from "next/link"
import prisma from "@/libs/prisma"
import Dashboard from "@/components/Dashboard/page"

const Page = async () => {
    const user = authUserSession()
    const comments = await prisma.comment.findMany({ where: { user_email: user.email } })


    return (
        <div className="flex flex-col mt-4">
            <Dashboard title={"My Comment"} className="" />
            <div className="flex flex-col gap-4 p-4">
                {comments.map(comment => {
                    return (
                        <Link href={`/anime/${comment.anime_mal_id}`} key={comment.id} className="w-full bg-color-primary text-color-dark p-4">
                            <p className="text-xl">{comment.anime_title}</p>
                            <p className="">{comment.username}: {comment.comment}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Page