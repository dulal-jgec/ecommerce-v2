import React, { useState } from "react";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
<nav className="sticky top-0 z-50 bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop */}
        <div className="hidden md:block">
          <NavbarDesktop />
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <NavbarMobile
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;