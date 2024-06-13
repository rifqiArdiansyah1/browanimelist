import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const Page = async ({ params }) => {
    const keyword = params.keyword
    const decodedKeyword = decodeURI(keyword)
    const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`)

    return (
        <>
            {/* SEARCH ANIME */}
            <section>
                <Header title={`Pencarian Untuk ${decodedKeyword}...`}/>
                <AnimeList api={searchAnime} />
            </section>
        </>
    )
}

export default Page