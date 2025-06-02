import Header from "./components/Header";
import Options from "./components/Options";

function Home() {
    return(
        <>
            <div className="relative">
                <Header/>
                <div className="fixed top-1/7 right-1/12 left-9/12">
                    <Options/>
                </div>
            </div>
        </>
    )
}
export default Home;