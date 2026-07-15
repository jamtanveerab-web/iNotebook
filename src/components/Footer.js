import React from 'react'

const Footer = () => {
    return (
        <>
       {!localStorage.getItem('token') ? <footer className="bg-blue py-5 hee">
            <div className="container">
                <div className="text-center lee">
                    <h3 className="fw-bold">iNotebook</h3>
                    <p className="mb-0">Created By Tanveer With &#10084;.</p>
                    <p className="mb-0">© 2026 iNotebook. All Rights Reserved.</p>
                </div>
            </div>
        </footer>:""}
        </>
    )
}

export default Footer
