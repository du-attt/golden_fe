import React, { Component, useState } from 'react'

const Header = () => {
    
    return(
        <div className="fixed top-0 left-0 z-50 w-full">
            <div className="w-full flex justify-between bg-gray-600 h-16">
                <div className="flex items-center w-1/2 m-8 ml-12">
                    <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-blue-500 text-2xl font-bold">
                        STUDENT
                    </p>
                </div>
                {/* <div className="flex items-center w-full max-w-md relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="border border-gray-300 rounded-full w-full h-10 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                    </div>
                </div> */}
            </div>
        
        </div>
    )
};
export default Header;
