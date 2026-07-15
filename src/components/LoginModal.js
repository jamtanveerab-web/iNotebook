import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginModal = (props) => {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
       const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            // save the authToken and redirect
            localStorage.setItem("token", json.authToken);
            const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
            if (modalInstance) {
                modalInstance.hide();
            }
            props.showAlert("Logged in Successfully", "success")
            navigate("/");
        } else {
            props.showAlert("Invalid credential", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div ref={modalRef} className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h1 className="modal-title fs-4" id="loginModalLabel">Welcome Back</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h2>Login to continue to iNoteBook</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 p-2">
                                <label htmlFor="loginEmail" className="form-label">Email address</label>
                                <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="loginEmail" name="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 p-2">
                                <label htmlFor="loginPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="loginPassword" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-4">Log in</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal