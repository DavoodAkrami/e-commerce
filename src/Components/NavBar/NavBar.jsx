import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./NavBar.module.css";
import clsx from "clsx";


const NavBar = ({pages}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavigate = (route) => {
        navigate(route);
        setIsMobileMenuOpen(false);
    };


    return (
        <>
            <div className={styles.navigationMenu}>
                <div
                    className={clsx(styles.hamburgerMenu, isMobileMenuOpen && styles.open)}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Open menu"
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setIsMobileMenuOpen(!isMobileMenuOpen); }}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={styles.desktopNavUl}>
                    {pages.map((page, index) => (
                        <li key={index} className={location.pathname === page.path ? styles.activeNavItem : styles.navItem} onClick={() => navigate(page.path)}>
                            {page.name}
                        </li>
                    ))}
                </ul>

                <ul className={clsx(styles.mobileMenu, isMobileMenuOpen && styles.open)}>
                    {isMobileMenuOpen && (
                        <div className={styles.mobileMenuHeader}>
                            <button
                                className={styles.closeButton}
                                aria-label="Close menu"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                &times;
                            </button>
                        </div>
                    )}
                    {isMobileMenuOpen &&
                        pages.map((page, index) => (
                            <li
                                key={index}
                                className={clsx(
                                    styles.mobileLi,
                                    location.pathname === page.path && styles.activeLiText
                                )}
                                style={{ '--i': index } }
                                onClick={() => handleNavigate(page.path)}
                            >
                                {page.name}
                            </li>
                        ))}
                </ul>
            </div>
            {isMobileMenuOpen && (
                <div className={styles.mobileMenuOverlay} onClick={() => setIsMobileMenuOpen(false)}></div>
            )}
        </>
    )
}

export default NavBar;