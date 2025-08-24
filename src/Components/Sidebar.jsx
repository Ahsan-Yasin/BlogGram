function Sidebar({ selectedTab, setSelectedTab }) {
  const handleOnClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar" style={{ width: "280px" }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <i className="bi bi-bootstrap-fill me-2" style={{ fontSize: "1.5rem" }}></i>
        <span className="fs-4"></span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item" onClick={() => handleOnClick("Home")}>
          <a href="#" className={`nav-link text-white ${selectedTab === "Home" && "active"}`} aria-current="page">
            <i className="bi bi-house-door me-2"></i>
            Home
          </a>
        </li>
        <li onClick={() => handleOnClick("CreatePost")}>
          <a href="#" className={`nav-link text-white ${selectedTab === "CreatePost" && "active"}`}>
            <i className="bi bi-speedometer2 me-2"></i>
            Create Post
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
