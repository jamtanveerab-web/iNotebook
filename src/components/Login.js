import React, { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();

    const myRef = useRef(null);
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
        console.log(json)
        if (json.success) {
            // save th authToken aand redriect 
            localStorage.setItem("token", json.authToken);
            const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
            if (modalInstance) {
                modalInstance.hide();
                props.showAlert("Logged in Successfully", "success")
                navigate("/");

            }
        } else {
            props.showAlert("Invalid credential", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const onchase = () => {
        myRef.current.click();
    }
    return (
        <>
            <div className=' container'>
                <div className="container text-center mt-5">
                    <div className="hero-badge ">
                        <span className="text-uppercase custom">SIMPLE · FOCUSED · PRIVATE</span><br />
                        <p className='fs-1 my-4 pt-5 pb-5'>Your notes,<br /><span style={{ color: '#4F39F6' }}>beautifully kept.</span></p>
                        <p style={{ color: "#6A7282" }}>iNotebook is a minimal note-taking app that lets you capture ideas<br /> with a title, description, and tags — then find them again without<br /> effort.</p>
                        <div className="d-flex justify-content-center gap-3 p-2">
                            <button className="rounded-4 btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal">Create free account</button>
                            <button className="rounded-4 btn btn-outline-secondary hoovr" onClick={onchase}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-5 rounded-4 p-2">
                <div className="row g-4 pb-4 rounded-5" style={{ backgroundColor: '#F9FAFB' }}>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card rounded-4 h-100">
                            <div className="card-body p-3 hoovr">
                                <h5 className="card-title">Meeting recap</h5>
                                <p className="card-text">
                                    Q3 planning kickoff — action items for the infra team
                                </p>
                                <div className="d-flex justify-content-center gap-2 flex-wrap">
                                    <p className="m-0 px-3 py-1 rounded-pill"
                                        style={{ color: "#A21CAF", backgroundColor: "#FDF2F8" }}>
                                        Work
                                    </p>
                                    <p className="m-0 px-3 py-1 rounded-pill" style={{ color: "#0369A1", backgroundColor: "#cad6ff" }}> Meetings </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card rounded-4 h-100">
                            <div className="card-body p-3 hoovr">
                                <h5 className="card-title">Book notes</h5>
                                <p className="card-text">
                                    Thinking Fast and Slow — dual-process theory summary.
                                </p>
                                <div className="d-flex justify-content-center gap-2 flex-wrap">
                                    <p className="m-0 px-3 py-1 rounded-pill"
                                        style={{ color: "#0369A1", backgroundColor: "#F0F9FF" }}>
                                        Reading
                                    </p>
                                    <p className="m-0 px-3 py-1 rounded-pill"
                                        style={{ color: "#4338CA", backgroundColor: "#EEF2FF" }}>
                                        Learning
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card rounded-4 h-100">
                            <div className="card-body p-3 hoovr">
                                <h5 className="card-title">Personal</h5>
                                <p className="card-text">
                                    Thinking Fast and Slow — dual-process theory summary.
                                </p>
                                <div className="d-flex justify-content-center gap-2 flex-wrap">
                                    <p className="m-0 px-3 py-1 rounded-pill"
                                        style={{ color: "#0369A1", backgroundColor: "#F0F9FF" }}>
                                        Food
                                    </p>
                                    <p className="m-0 px-3 py-1 rounded-pill"
                                        style={{ color: "#4338CA", backgroundColor: "#EEF2FF" }}>
                                        Personal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <h2 className='text-center mb-3'><b>Everything you need, nothing you don't.</b></h2>
            <div className="row mb-3 justify-content-center container  ">
                <div className="col-lg-4  mb-3 mb-sm-0">
                    <div className="card hoovr">
                        <div className="card-body">
                            <i className="fa-solid fa-notes-medical pb-4"></i>
                            <h5 className="card-title">Structured notes</h5>
                            <p className="card-text">Every note gets a title, rich description, and tags — so finding what you wrote is never a scavenger hunt.</p>

                        </div>
                    </div>
                </div>
                <div className="col-lg-4 ">
                    <div className="card hoovr">
                        <div className="card-body">
                            <i className="fa-solid fa-file-shield pb-4"></i>
                            <h5 className="card-title">Yours alone</h5>
                            <p className="card-text">Notes are scoped to your account and stored locally. No sharing, no exposure — private by design.</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center container mb-5">
                <div className="col-lg-4  mb-3 mb-sm-0">
                    <div className="card hoovr">
                        <div className="card-body">
                            <i className="fa-solid fa-tag pb-4 "></i>
                            <h5 className="card-title">Tag everything</h5>
                            <p className="card-text">Colour-coded tags let you cluster work, personal, and research notes without nested folders.</p>

                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card hoovr">
                        <div className="card-body">
                            <i className="fa-solid fa-door-open pb-4"></i>
                            <h5 className="card-title">Edit & delete freely</h5>
                            <p className="card-text">Thoughts evolve. Update any note inline or remove it entirely — no drafts, no sync delays.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Button trigger modal --> */}
            <Link ref={myRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" role="button" to="/siginup">
                Launch demo modal
            </Link>

            {/* <!-- Modal --> */}
            <div ref={modalRef} className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h1 className="modal-title fs-4" id="exampleModalLabel">Welcome Back</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2>Login to continue to iNoteBook</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 p-2">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control " onChange={onChange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp" />

                                </div>
                                <div className="mb-3 p-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" />
                                </div>
                                <button type="submit" className="btn btn-primary  w-100 rounded-4" >Log in</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Login
