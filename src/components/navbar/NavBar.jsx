import iconoKayak from '../../assets/iconoKayak.svg'
import "./NavBar.css"

const Header = () => {

  return (
    <div>
      <nav className="header">
        <div className="header-left">
          <div className="iconoKayak">
          <img src={iconoKayak} alt="Logo Kayak" width={35} height={35} />
          </div>
          <a className="header-text">El Rincon del Remo</a>
        </div>
        <div className="header-right">
         <a className="header-text">Perfil</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
