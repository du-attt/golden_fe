import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <button 
                className="fixed top-4 left-4 z-50 md:hidden text-black bg-gray-700 p-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FiMenu size={24} />
            </button>
            <div className={`fixed z-1 top-16 left-0 h-[calc(100vh-4rem)] w-[200px] bg-gradient-to-b from-gray-600 to-gray-400 
                shadow-lg text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                transition-transform duration-300 md:translate-x-0`}>
                
                <div className="flex w-full items-center justify-center p-6">
                    <h3 className="text-white font-bold text-2xl">MENU</h3>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

                {[
                    { path: "/", label: "Home" },
                    { path: "/searchscores", label: "Search Scores" },
                    { path: "/reports", label: "Reports" }
                ].map(({ path, label }) => (
                    <>
                        <div
                            key={path}
                            className={`flex w-full h-10 items-center justify-center cursor-pointer 
                                ${isActive(path) ? "bg-blue-500 text-white" : "text-white"}`}
                            onClick={() => { navigate(path); setIsOpen(false); }}
                        >
                            <p>{label}</p>
                        </div>
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

                    </>
                ))}
            </div>
        </>
    );
};

export default Sidebar;
