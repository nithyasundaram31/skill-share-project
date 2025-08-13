import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function AdminDashboard() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <NavBar />
        <div className="p-4 flex justify-center  items-center mt-16  md: lg:ml-36">
          <Outlet /> {/* Nested routes */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard