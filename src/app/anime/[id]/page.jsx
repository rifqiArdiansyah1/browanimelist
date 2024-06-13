import CollectionButton from "@/components/AnimeList/CollectionButton"
import CommentBox from "@/components/AnimeList/CommentBox"
import CommentInput from "@/components/AnimeList/CommentInput"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import { getAnimeResponse } from "@/libs/api-libs"
import authUserSession from "@/libs/auth-libs"
import prisma from "@/libs/prisma"
import Image from "next/image"

const Page = async ({ params: { id } }) => {
    const anime = await getAnimeResponse(`anime/${id}`)
    const user = await authUserSession()
    const collection = await prisma.collection.findFirst({
        where: { user_email: user?.email }})
    // const comment = await prisma.comment.findFirst({
    //     where: { user_email: user?.email, anime_mal_id: id, username: user?.name}
    // })

    // console.log({user})

    return (
        <>
            <div className="pt-4 px-4">
                <h3 className="text-2xl text-color-primary">{anime.data.title} - {anime.data.year}</h3>
                {
                    !collection && user && <CollectionButton anime_mal_id={id} user_email={user?.email}
                        anime_image={anime?.data.images.webp.image_url} anime_title={anime?.data.title} />
                }
            </div>

            <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary">
                    <h3>PERINGKAT</h3>
                    <p>{anime.data.rank}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary">
                    <h3>SKOR</h3>
                    <p>{anime.data.score}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary">
                    <h3>ANGGOTA</h3>
                    <p>{anime.data.members}</p>
                </div>
                <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary">
                    <h3>EPISODE</h3>
                    <p>{anime.data.episodes}</p>
                </div>
            </div>

            <div className="pt-4 px-4 flex gap-2 sm:flex-nowrap flex-wrap text-color-primary">
                <Image
                    src={anime.data.images.webp.image_url}
                    alt={anime.data.images.jpg.image_url}
                    width={250}
                    height={250}
                    className="w-full rounded object-cover"
                />
                <p className="text-justify text-xl">{anime.data.synopsis}</p>
            </div>
            <div className="p-4">
                <h3 className="text-color-primary text-2xl pb-3">Komentar Penonton</h3>
                <CommentBox anime_mal_id={id} />
                {user && <CommentInput anime_mal_id={id} user_email={user?.email} username={user?.name}
                    anime_title={anime.data.title} />}
            </div>
            <div>
                <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
            </div>
        </>
    )

}

export default Page