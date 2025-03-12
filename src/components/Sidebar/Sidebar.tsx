import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại

    // Hàm kiểm tra xem trang hiện tại có khớp với đường dẫn không
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[200px] shadow-lg bg-gradient-to-b from-gray-600 via-gray-500 to-gray-400 text-white">

            <div className="flex w-full items-center justify-center p-10">
                <h3 className="text-white font-bold text-2xl">MENU</h3>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            <div
                className={`flex w-full h-10 items-center justify-center cursor-pointer 
                    ${isActive("/") ? "bg-blue-500 text-white" : "text-white"}`}
                onClick={() => navigate("/")}
            >
                <p>Home</p>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>


            <div
                className={`flex w-full h-10 items-center justify-center cursor-pointer 
                    ${isActive("/searchscores") ? "bg-blue-500 text-white" : "text-white"}`}
                onClick={() => navigate("/searchscores")}
            >
                <p>Search Scores</p>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

            <div
                className={`flex w-full h-10 items-center justify-center cursor-pointer 
                    ${isActive("/reports") ? "bg-blue-500 text-white" : "text-white"}`}
                onClick={() => navigate("/reports")}
            >
                <p>Reports</p>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        </div>
    );
};

export default Sidebar;
