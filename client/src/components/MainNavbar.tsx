import React from 'react';

function MainNavbar() {
    
    return (
        <>
           <nav className="navbar navbar-expand-lg" style={{background: "#becbff"}}>
                <div className="container">
                    <img style={{width: "50px", marginRight: "10px"}} src="/logo.png" alt="Logo" />
                    <div style={{marginRight: "40px"}}>Animelist</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/data">Data</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="https://letdm.glitch.me/">LetDM</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}


export default MainNavbar;