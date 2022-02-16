const Header = () => {
  return (
    <header className="header">
      <h1>Dog's R Us</h1>
      <nav>
        <ul className='header__menu'>
          <li className='header__menu-li'><a className="header__menu-a" href="#" target="_blank">Home</a></li>
          <li className='header__menu-li'><a className="header__menu-a" href="#" target="_blank">About</a></li>
          <li className='header__menu-li'><a className="header__menu-a" href="#" target="_blank">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  )

}

export { Header }

