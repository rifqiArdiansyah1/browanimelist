import Dashboard from "@/components/Dashboard/page"
import authUserSession from "@/libs/auth-libs"
import Image from "next/image"
import Link from "next/link"
import prisma from "@/libs/prisma"

const Page = async () => {
    const user = authUserSession()
    const collection = await prisma.collection.findMany({ where: { user_email: user.email}})


    return (
        <section className="mt-4 ">
            <Dashboard title={"My Collection"} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {collection.map((collect, index) => {
                    return (
                        <Link key={index} href={`/anime/${collect.anime_mal_id}`}
                            className="relative">
                            <Image src={collect.anime_image} alt="" width={350} height={350} className="w-full" />
                            <div className="absolute justify-center items-center w-full bottom-0 h-16 flex bg-color-accent">
                                <h5 className="text-xl">{collect.anime_title}</h5>
                            </div>
                        </Link>
                    )
                })
                }
            </div>
        </section>
    )
}

export default Page