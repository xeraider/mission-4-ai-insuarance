const Navbar = () => {
    return (
        <div className={"navbar-container"}>
            <nav className="header-top-menu">
                <a href="/Cars/">Cars</a>
                <a href="/Trucks-Machinery/">Trucks &amp; Machinery</a>
                <a href="/Damaged-Vehicles/">Damaged &amp; End of Life</a>
                <a href="/motorcycles-scooters/">Motorcycles</a>
                <a href="/General-Goods/">General Goods</a>
                <a href="/buses-caravans/">Buses, Caravans &amp; Motorhomes</a>
                <a href="/boats-marine/">Boats &amp; Marine</a>
            </nav>

            <div className="large-screen-header-content">

                <a href="/Cars/Chinese-Speaking-Contacts/"
                   className="button red-outline-button header-chinese-link">中文</a>

                <a href="/Company/Branches/" className="header-contact-link">Find Us</a>

                <a href="tel:0800 887 637" className="header-phone-number">0800 887 637</a>

                <div className="header-account-links">

                    <div className="account-panel-trigger-container">
                        <a href="/Login/?ReturnUrl=/" className="account-panel-trigger">Login</a>
                        <span className="or">or</span>
                        <a href="/Login/Registration/">Register</a>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Navbar
