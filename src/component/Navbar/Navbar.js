import logo from "./PhotoLogo.png";
import styles from "./Navbar.module.css";

const Navbar = ()=>{
      return(
          <div className={styles.nav}>
              <img src={logo} alt="logo"/>
              <span>Photo folio</span>
          </div>
      )
}
export default Navbar;