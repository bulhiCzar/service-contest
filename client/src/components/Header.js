import {NavLink} from "react-router-dom";
import Committee from "../pages/Committee";


const Header = () => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink className='nav-link' to='/' exact activeClassName='active'>
                            Главная
                        </NavLink>
                        <NavLink className='nav-link' to='/create' activeClassName='active'>
                            Создать
                        </NavLink>
                        <NavLink className='nav-link' to='/committee' activeClassName='active'>
                            Комитет
                        </NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header