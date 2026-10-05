import ButtonList from "./ButtonList"
import VideoContainer from "./VideoContainer"


const MainContainer = () => {
    return (
        <div className="flex flex-col flex-grow p-4">
            <ButtonList/>
            <VideoContainer/>
        </div>
    )
}

export default MainContainer