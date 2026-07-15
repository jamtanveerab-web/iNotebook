import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignupModal = (props) => {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (password !== cpassword) {
            props.showAlert("Password do not match", "danger")
            return;
        }
       const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
            if (modalInstance) {
                modalInstance.hide();
            }
            props.showAlert("Account Created Successfully", "success")
            navigate("/");
        } else {
            props.showAlert("Invalid Details", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div ref={modalRef} className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h1 className="modal-title fs-4" id="signupModalLabel">Create Account</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h2>Create an account to continue to iNoteBook</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 p-2">
                                <label htmlFor="signupName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="signupName" name='name' onChange={onChange} />
                            </div>
                            <div className="mb-3 p-2">
                                <label htmlFor="signupEmail" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="signupEmail" name='email' onChange={onChange} aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3 p-2">
                                <label htmlFor="signupPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' id="signupPassword" onChange={onChange} minLength={5} required />
                            </div>
                            <div className="mb-3 p-2">
                                <label htmlFor="signupCpassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="signupCpassword" name='cpassword' onChange={onChange} minLength={5} required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-4">Submit</button>
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

export default SignupModal