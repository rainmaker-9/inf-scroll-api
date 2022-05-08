import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: false,
      page: 0,
      prevY: 0,
    };
  }

  componentDidMount() {
    this.getPosts(this.state.page);

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      let curPage = this.state.page;
      curPage++;
      this.getPosts(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  getPosts(page) {
    this.setState({ loading: true });
    fetch(
      `https://api.unsplash.com/photos?page=${page}&&client_id=4b93d1ba487be4e97a48a5872cfa8809e43a1c00a958f3d2da777e25f5aab6a2`
    ).then((response) => {
      if (response.ok && response.status === 200) {
        response.json().then((result) => {
          this.setState({ posts: [...this.state.posts, ...result] });
          this.setState({ loading: false });
          console.log(result);
        });
      }
    });
  }

  calculateTime(date) {
    let date_past = new Date(date);
    let date_now = new Date();

    let seconds = Math.floor((date_now - date_past) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    if (days >= 1) {
      return days + (days == 1 ? " day" : " days") + " ago";
    } else if (hours <= 24) {
      return hours + (hours == 1 ? " hour" : " hours") + " ago";
    } else if (minutes <= 60) {
      return minutes + (minutes == 1 ? " minute" : " minutes") + " ago";
    } else if (seconds <= 60) {
      return seconds + " seconds ago";
    }
  }

  render() {
    return (
      <main>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
            <div className="container">
              <a className="navbar-brand brand-color" href="#">
                <i className="fa-brands fa-linkedin-in fa-2x"></i>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <form className="d-flex">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0 border-bottom">
                      <i className="fa-solid fa-search text-muted"></i>
                    </span>
                    <input
                      className="form-control me-2 border-0 border-bottom"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </div>
                </form>
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      <i className="fa-regular fa-house-blank fa-fw me-3"></i>
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa-regular fa-users fa-fw me-3"></i>
                      Network
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa-regular fa-comment fa-fw me-3"></i>
                      Messaging
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <div className="position-relative d-inline-block">
                        <i className="fa-regular fa-bell fa-fw me-3"></i>
                        <div
                          className="position-absolute top-0"
                          id="notification-dot"
                        >
                          <div className="bg-primary"></div>
                        </div>
                      </div>
                      Notifications
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa-regular fa-briefcase fa-fw me-3"></i>
                      Jobs
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa-regular fa-grid-2 fa-fw me-3"></i>
                      Work
                    </a>
                  </li>
                </ul>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="https://source.unsplash.com/uJ8LNVCBjFQ/640x640"
                        alt="Lucille Montgomery"
                        className="account-dropdown"
                      />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Settings
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <section className="bg-gray">
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-md-3">
                <div className="row sticky-top aside-content">
                  <div className="col-12">
                    <div className="card border-0 shadow">
                      <div className="card-header bg-white border-0 text-end">
                        <a href="#" className="text-muted">
                          <i className="fa-regular fa-pen-to-square"></i>
                        </a>
                      </div>
                      <div className="card-body text-center">
                        <div className="mb-4">
                          <img
                            src="https://source.unsplash.com/uJ8LNVCBjFQ/640x640"
                            alt="Lucille Montgomery"
                            className="profile-avtar"
                          />
                          <h4 className="mt-3 mb-0">Lucille Montgomery</h4>
                          <p className="m-0 text-muted">UI/UX Designer</p>
                          <a
                            className="d-block text-truncate text-decoration-none"
                            href="https://linkedin/com/in/lucillemontgomery"
                          >
                            <i className="fa-regular fa-paperclip me-2"></i>
                            <span className="text-muted">
                              https://linkedin/com/in/lucillemontgomery
                            </span>
                          </a>
                        </div>
                        <div className="border-top border-bottom">
                          <div className="hstack gap-3">
                            <div className="col-6 my-3 border-end">
                              <h5 className="my-1">767</h5>
                              <p className="my-1 text-muted">Connections</p>
                            </div>
                            <div className="col-4 my-3">
                              <h5 className="my-1 text-center">60</h5>
                              <p className="my-1 text-center text-muted">
                                Views
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 mb-3">
                          <small className="text-muted">
                            Free Access exclusive tools &amp; insights
                          </small>
                        </p>
                        <button className="btn btn-light rounded-pill btn-lg text-uppercase text-primary">
                          Upgrade to Premium
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="card border-0 shadow">
                      <div className="card-body">
                        <div className="mb-3">
                          <textarea
                            className="form-control form-control-lg border-0"
                            name="post-content"
                            id="post-content"
                            placeholder="Write here. Add images or a video for visual impact."
                          ></textarea>
                        </div>
                      </div>
                      <div className="card-footer py-3 bg-white d-flex justify-content-between align-items-center">
                        <div>
                          <a
                            href="#"
                            className="text-decoration-none link-dark me-3"
                          >
                            <i className="fa-regular fa-newspaper me-2"></i>
                            Article
                          </a>
                          <a
                            href="#"
                            className="text-decoration-none link-dark me-3"
                          >
                            <i className="fa-regular fa-camera me-2"></i>
                            Image
                          </a>
                          <a
                            href="#"
                            className="text-decoration-none link-dark"
                          >
                            <i className="fa-regular fa-video me-2"></i>
                            Video
                          </a>
                        </div>
                        <a href="#">
                          <i className="fa-solid fa-paper-plane-top fa-2x"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12" id="feed">
                    <div className="row g-3">
                      {this.state.posts.map((post) => {
                        return (
                          <div className="col-12">
                            <div className="card border-0 shadow">
                              <div className="card-header pt-4 bg-white border-0">
                                <div className="d-flex">
                                  <img
                                    src={post.user.profile_image.medium}
                                    alt={post.user.name}
                                    className="post-profile-pic"
                                  />
                                  <div className="ms-3">
                                    <h6 className="mb-0">{post.user.name}</h6>
                                    <p className="m-0 text-muted">
                                      <small>
                                        {post.created_at &&
                                        post.created_at != null
                                          ? this.calculateTime(post.created_at)
                                          : "Post Date"}
                                      </small>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="card-body">
                                <p>{post.user.bio}</p>
                                <img
                                  src={post.urls.regular}
                                  alt={post.user.name}
                                  className="d-block w-100 post-img"
                                />
                              </div>
                              <div className="card-footer pt-1 pb-3 border-0 bg-white">
                                <a
                                  href="#"
                                  className="text-decoration-none me-3"
                                >
                                  <i className="fa-solid fa-heart text-danger me-2"></i>
                                  {post.likes}
                                </a>
                                <a
                                  href="#"
                                  className="text-decoration-none text-muted"
                                >
                                  <i className="fa-regular fa-share-nodes me-2"></i>
                                  Share
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div ref={(loadingRef) => (this.loadingRef = loadingRef)}>
                      <i className="fa-solid fa-spinner-third fa-spin"></i>{" "}
                      Loading...
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="row sticky-top aside-content">
                  <div className="col-12">
                    <div className="card border-0 shadow">
                      <div className="card-header bg-white">
                        <h5 className="card-title my-3">People you may know</h5>
                      </div>
                      <div className="card-body">
                        <div className="mt-2 mb-4 d-flex justify-content-between align-items-center">
                          <img
                            src="https://source.unsplash.com/tNCH0sKSZbA/640x640"
                            alt="Nina Douglas"
                            className="profile-pic"
                          />
                          <div>
                            <h5 className="fw-bold mb-0">Nina Douglas</h5>
                            <p className="m-0 text-muted">
                              <small>Recruiter - Orange</small>
                            </p>
                          </div>
                          <button className="btn btn-light btn-sm rounded-circle">
                            <i className="fa-solid fa-plus text-primary"></i>
                          </button>
                        </div>
                        <hr />
                        <div className="my-4 d-flex justify-content-between align-items-center">
                          <img
                            src="https://source.unsplash.com/WNoLnJo7tS8/640x640"
                            alt="Harry Caldwell"
                            className="profile-pic"
                          />
                          <div>
                            <h5 className="fw-bold mb-0">Harry Caldwell</h5>
                            <p className="m-0 text-muted">
                              <small>
                                <span className="d-block">
                                  Looking for team
                                </span>
                                <span className="d-block">
                                  Lead Java Developer
                                </span>
                              </small>
                            </p>
                          </div>
                          <button className="btn btn-light btn-sm rounded-circle">
                            <i className="fa-solid fa-plus text-primary"></i>
                          </button>
                        </div>
                        <hr />
                        <div className="my-4 d-flex justify-content-between align-items-center">
                          <img
                            src="https://source.unsplash.com/TJDvP6xm2Eo/640x640"
                            alt="Hettie Patrick"
                            className="profile-pic"
                          />
                          <div>
                            <h5 className="fw-bold mb-0">Hettie Patrick</h5>
                            <p className="m-0 text-muted">
                              <small>UI/UX Designer</small>
                            </p>
                          </div>
                          <button className="btn btn-light btn-sm rounded-circle">
                            <i className="fa-solid fa-plus text-primary"></i>
                          </button>
                        </div>
                        <hr />
                        <div className="mt-4 mb-2 d-flex justify-content-between align-items-center">
                          <img
                            src="https://source.unsplash.com/DWpHQOjdyho/640x640"
                            alt="Fannie Santiago"
                            className="profile-pic"
                          />
                          <div>
                            <h5 className="fw-bold mb-0">Fannie Santiago</h5>
                            <p className="m-0 text-muted">
                              <small>SEO Specialist</small>
                            </p>
                          </div>
                          <button className="btn btn-light btn-sm rounded-circle">
                            <i className="fa-solid fa-plus text-primary"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
