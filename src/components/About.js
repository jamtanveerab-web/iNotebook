import React from 'react'

const About = () => {
  return (
    <div className='mt-5' >
      <p className='container' style={{ color: "#0087ff", fontFamily: "Inter,'FontAwesome', sans-serif", fontSize: "12px", letterSpacing: "2px" }}>  ABOUT INOTEBOOK</p>
      <div >
        <div className="mt-5 ">
          <div className="hero-badge text-center mb-5">
            <h1 className=' fs-1 my-4 pt-5 pb-5'>We built the notebook<br /><span style={{ color: '#4F39F6' }}>we always wanted.</span></h1>
            <h4 className='container' style={{ color: "#6A7282" }}>iNotebook started as a personal frustration project. Every tool we tried was either too powerful or too shallow. So we built something in the middle — structured enough to be useful, minimal enough to stay out of the way.</h4>
          </div>
          <div className="d-flex justify-content-center text-center py-5" style={{ backgroundColor: "#F9FAFB" }}>
            <div className="mx-4">
              <span className="fw-bold fs-3" style={{ color: "#4F39F6" }}>&lt;1S</span><br />
              Time to create a note
            </div>

            <div className="mx-4">
              <span className="fw-bold fs-3" style={{ color: "#4F39F6" }}>0</span><br />
              Third-party servers
            </div>

            <div className="mx-4">
              <span className="fw-bold fs-3" style={{ color: "#4F39F6" }}>&infin;</span><br />
              Notes you can keep
            </div>
          </div>
          <div className="container">
          <h1 className='mt-3'>What we belive</h1>
          <div className="container py-5">
            <div className="row py-4 border-bottom">
              <div className="col-2 text-primary fw-light">
                01
              </div>
              <div className="col-10">
                <h3 className="fw-bold">Simplicity over features</h3>
                <p className="text-secondary mb-0">
                  Every note-taking app eventually becomes a project manager.
                  iNotebook refuses that path. A title, a description, some tags —
                  that's the whole surface. Constraints produce clarity.
                </p>
              </div>
            </div>

            <div className="row py-4 border-bottom">
              <div className="col-2 text-primary fw-light">
                02
              </div>
              <div className="col-10">
                <h3 className="fw-bold">Private by default</h3>
                <p className="text-secondary mb-0">
                  Your notes live in your browser's local storage, scoped to your
                  account. No analytics, no third-party servers, just your notes.
                </p>
              </div>
            </div>

            <div className="row py-4">
              <div className="col-2 text-primary fw-light">
                03
              </div>
              <div className="col-10">
                <h3 className="fw-bold">Speed above ceremony</h3>
                <p className="text-secondary mb-0">
                  Opening a note should feel like reaching for a pen. Type, save,
                  done. iNotebook gets out of the way immediately.
                </p>
              </div>
            </div>
            </div>
          </div>
          <div className="container py-5">
    <div className="mx-auto" style={{ maxWidth: "750px" }}>

        <h1 className="fw-bold display-5 mb-5">How it started.</h1>

        <div className="timeline">

            <div className="timeline-item">
                <div className="dot"></div>
                <div className="content">
                    <small className="text-uppercase text-primary fw-semibold">
                        The Problem
                    </small>
                    <p className="mt-2">
                        We kept switching tools — Notion was too complex, plain
                        text was too unstructured, and everything in between
                        wanted a subscription.
                    </p>
                </div>
            </div>

            <div className="timeline-item">
                <div className="dot"></div>
                <div className="content">
                    <small className="text-uppercase text-primary fw-semibold">
                        The Idea
                    </small>
                    <p className="mt-2">
                        What if notes had just enough structure: a title you'd
                        actually search by, a body you could write freely in,
                        and tags to cluster related thoughts?
                    </p>
                </div>
            </div>

            <div className="timeline-item">
                <div className="dot"></div>
                <div className="content">
                    <small className="text-uppercase text-primary fw-semibold">
                        The Build
                    </small>
                    <p className="mt-2">
                        A weekend prototype with React and localStorage. No
                        backend. No accounts beyond a local login.
                        Surprisingly complete.
                    </p>
                </div>
            </div>

            <div className="timeline-item">
                <div className="dot"></div>
                <div className="content">
                    <small className="text-uppercase text-primary fw-semibold">
                        Today
                    </small>
                    <p className="mt-2">
                        iNotebook is exactly that prototype, polished and
                        released. It does one thing well and nothing else.
                    </p>
                </div>
            </div>

        </div>

    </div>
</div>
<div className="text-center mb-5"><h1>"The best tool is the one you actually use."</h1><br/> <span className=' text-muted'>— The iNotebook team</span></div>
        </div>
      </div>
      <footer className="bg-blue py-5 hee">
      <div className="container">
        <div className="text-center lee">
          <h3 className="fw-bold">iNotebook</h3>
          <p className="mb-0">Created By Tanveer ❤️</p>
          <p className="mb-0">© 2026 iNotebook. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
    </div>
    
  )
}

export default About
