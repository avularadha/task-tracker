function Navbar({darkMode,setDarkMode}) {

  return (
    <nav className="navbar">
      <h1>TaskTracker</h1>

      <button className="theme-btn" onClick={()=>setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  )
}

export default Navbar