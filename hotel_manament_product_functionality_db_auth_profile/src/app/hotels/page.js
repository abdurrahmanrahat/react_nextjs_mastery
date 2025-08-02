import HotelList from "@/components/hotel/HotelList"
import Filter from "@/components/search/Filter"
import Search from "@/components/search/Search"

const HotelsListPage = () => {
    return (
        <>
            {/* <!-- Search Modify Area --> */}
            <section class="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
                <div class="container items-center py-12 ">
                    <Search fromList={true} />
                </div>
            </section>
            {/* <!-- Search Result Area --> */}
            <section class="py-12">
                <div class="container grid grid-cols-12">
                    <Filter />
                    <HotelList />
                </div>
            </section>
        </>
    )
}

export default HotelsListPage