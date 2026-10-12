import MainContainer from "./MainContainer";
import Sidebar from "./Sidebar";
export default function Body() {
  return (
    <div className="layout">
      <Sidebar />
      <MainContainer />
    </div>
  );
}
