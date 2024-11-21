import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div>
        <h3>RAS</h3>
      </div>
      <div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/addItems">Add Items</a>
          </li>
          <li>
            <a href="/stocks">Stocks</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
