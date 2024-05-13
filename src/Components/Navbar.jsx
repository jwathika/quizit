import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            {/* This example requires Tailwind CSS v2.0+ */}
            <div className="relative bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-center items-center border-b-2 border-gray-100 py-6 md:justify-center md:space-x-10">
                        <a href="/" className="flex justify-center items-center">
                            <span className="sr-only">Quiz</span>
                            <img
                                className="h-6 w-auto sm:h-30" style={{ stroke: '#60a5fa' }}
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt=""
                            />
                            <h3 className="text-lg font-bold mx-3">
                                Quiz App
                            </h3>
                        </a>
                        <nav className="flex gap-8">
                            <Link
                                to="/add-question"
                                className="text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                                Add Question
                            </Link>
                            <Link
                                to="/view-question"
                                className="text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                                View Questions
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
