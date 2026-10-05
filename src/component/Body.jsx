import MainContainer from "./MainContainer"
import Sidebar from "./Sidebar"

const Body = () => {
    return (
        <div className="flex flex-row">
            <Sidebar/>
            <MainContainer/>
        </div>
    )
}

export default Body