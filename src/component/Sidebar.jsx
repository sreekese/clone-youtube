import { Home, Music, FilmIcon, Gamepad2, SportShoe } from "lucide-react"
import { useSelector } from "react-redux"

const Sidebar = () => {
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
    <div className={`w-64 bg-gray-100 p-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <h1 className="text-lg font-bold">Subscriptions</h1>
        <ul className="mt-4">
            <li className="flex items-center p-2 hover:bg-gray-200"><Home className="mr-4"/>Home</li>
            <li className="flex items-center p-2 hover:bg-gray-200"><Music className="mr-4"/>Music</li>
            <li className="flex items-center p-2 hover:bg-gray-200"><FilmIcon className="mr-4"/>Movies</li>
            <li className="flex items-center p-2 hover:bg-gray-200"><Gamepad2 className="mr-4"/>Games</li>
            <li className="flex items-center p-2 hover:bg-gray-200"><SportShoe className="mr-4"/>Sports</li>
        </ul>
        <h1 className="text-lg font-bold mt-8">Library</h1>
        <ul className="mt-4">
            <li className="flex items-center p-2 hover:bg-gray-200"><Home className="mr-4"/>History</li>
            <li className="flex items-center p-2 hover:bg-gray-200"><Music className="mr-4"/>Watch Later</li>
            <li className="flex items-center p-2 hover:bg-gray-200"><FilmIcon className="mr-4"/>Liked Videos</li>
        </ul>
        <h1 className="text-lg font-bold mt-8">More from YouTube</h1>
        <ul className="mt-4">
            <li className="flex items-center p-2 hover:bg-gray-200"><Gamepad2 className="mr-4"/>YouTube Premium</li>
            <li className="flex items-center p-2 hover:bg-gray-200"><SportShoe className="mr-4"/>YouTube Music</li>
            <li className="flex items-center p-2 hover:bg-gray-200"><FilmIcon className="mr-4"/>YouTube Kids</li>
        </ul>
    </div>
  )
}

export default Sidebar