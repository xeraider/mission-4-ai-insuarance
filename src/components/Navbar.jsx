import '../styles/Navbar.css'
import Logo from "../assets/logo-desktop.png";

const Navbar = () => {
    return (
        <>
            <div className="navbar-container">

                <div className="navbar-links">

                    <a href="https://www.turners.co.nz/Cars/">Cars</a>
                    <a href="https://www.turners.co.nz/Trucks-Machinery/">Trucks &amp; Machinery</a>
                    <a href="https://www.turners.co.nz/Damaged-Vehicles/">Damaged &amp; End of Life</a>
                    <a href="https://www.turners.co.nz/motorcycles-scooters/">Motorcycles</a>
                    <a href="https://www.turners.co.nz/General-Goods/">General Goods</a>
                    <a href="https://www.turners.co.nz/buses-caravans/">Buses, Caravans &amp; Motorhomes</a>
                    <a href="https://www.turners.co.nz/boats-marine/">Boats &amp; Marine</a>

                </div>

                <a href="https://www.turners.co.nz/Cars/" className="navbar-logo">
                    <img src={Logo} className="logo" alt="Turners Logo for Desktop and Tablet"/>
                </a>

                <div className="navbar-content">

                    <a href="https://www.turners.co.nz//Cars/Chinese-Speaking-Contacts/"
                       className="chinese-link">中文</a>

                    <a href="https://www.turners.co.nz//Company/Branches/" className="contact-link">Find Us</a>

                    <a href="tel:0800 887 637" className="phone-number">0800 887 637</a>

                    <div className="accounts">
                        <a href="https://www.turners.co.nz//Login/?ReturnUrl=/">LOGIN </a>
                        <span>OR</span>
                        <a href="https://www.turners.co.nz//Login/Registration/"> REGISTER</a>
                    </div>
                </div>

            </div>

            <div className="menu-container">

                <nav className="menu">

                    <div className="left-menu">

                        <a href="/Cars/Used-Cars-for-Sale/" className="find-link">Find a Car</a>
                        <a href="#" className="dropdown">How to Buy</a>
                        <a href="#" className="dropdown">Sell your Car</a>
                        <a href="#" className="dropdown">Finance &amp; Insurance</a>
                        <a href="#" className="dropdown">Mobile Servicing</a>

                    </div>

                    <div className="right-menu">

                        <a href="#" className="dropdown">Auctions</a>
                        <a href="#" className="dropdown">More Info</a>

                    </div>

                </nav>

            </div>
        </>
    )
}
export default Navbar
