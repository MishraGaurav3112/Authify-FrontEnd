import React from 'react'
import Menubar from "../components/Menubar.jsx";
import Header from "../components/Header.jsx";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-vh-100">

            <Menubar />
            <Header />

        </div>

    )
}

export default Home