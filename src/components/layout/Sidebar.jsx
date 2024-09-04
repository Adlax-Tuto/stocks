import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/dollar-sign-money.svg";
import { NavLink, useLocation } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Wrapper = styled.section`
	height: 100%;
	font-size: 4rem;
	.container {
		background-color: var(--clr-charcoal-5);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		color: var(--clr-jasper-5);
		box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 18px 16px 15px 5px rgba(0, 0, 0, 0);
		.logo-container {
			margin-top: 10rem;
			/* border: 2px solid white; */
			width: 50%;
			.logo {
				width: 100%;
				height: 100%;
			}
		}
		.title-container {
			/* border: 2px solid white; */
			font-size: 3.5rem;
			width: 100%;
			text-align: center;
			margin-top: -8rem;
			letter-spacing: 0.5rem;
			text-shadow: -1px -1px 1px #000;
			font-weight: bold;
			font-family: "Iceland";
		}
		.nav-container {
			/* border: 1px solid white; */
			width: 100%;
			display: flex;
			flex-direction: column;
			color: var(--clr-pale-dogwood-5);
			.link-row {
				/* border: 1px solid white; */
				width: 100%;
				text-align: center;
				transition: all 0.5s ease-in-out;
				&:hover {
					background-color: var(--clr-poppy-5);
					color: var(--clr-charcoal-5);
					padding-left: 15%;
				}
			}
			.active-row {
				background-color: var(--clr-poppy-5);
				color: var(--clr-charcoal-5);
			}
		}
		.footer-container {
			border-top: 1px solid var(--clr-jasper-5);
			width: 100%;
			font-size: 1.5rem;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			justify-content: space-between;
			align-items: center;
			.align-text-left {
				text-align: start;
			}
			.align-text-center {
				text-align: center;
			}
			.align-text-right {
				text-align: end;
			}
		}
	}
	.mobile-container {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		transform: translateX(-120%);
		transition: all 0.2s ease-in-out;
		.logo-container {
			margin-top: 5rem;
			width: 40%;
		}
		.title-container {
			margin-top: -2rem;
			font-size: 5rem;
		}
	}
	.mobile-container-show {
		transform: translateX(0);
	}
	.btn {
		cursor: pointer;
		position: absolute;
		transition: all 0.2s ease-in-out;
		&:hover {
			transform: scale(1.1);
			background-color: var(--clr-charcoal-5);
			color: var(--clr-poppy-5);
		}
	}
	.btn-open {
		border: 2px solid var(--clr-poppy-5);
		border-radius: 50%;
		padding: 0.5rem;
		display: grid;
		place-content: center;
		background-color: var(--clr-jasper-5);
		color: var(--clr-charcoal-5);
		top: 2rem;
		left: 2rem;
	}
	.btn-close {
		top: 3rem;
		right: 3rem;
		font-size: 5rem;
	}
	@media screen and (max-width: 1200px) {
		.desktop-container {
			.title-container {
				font-size: 3rem;
			}
		}
	}
	@media screen and (max-width: 1000px) {
		.desktop-container {
			.title-container {
				font-size: 2.7rem;
			}
		}
	}
	@media screen and (max-width: 400px) {
		.mobile-container {
			.logo-container {
				margin-top: 10rem;
			}
		}
	}
`;

const Sidebar = () => {
	const [desktopMode, setDesktopMode] = useState(false);

	const location = useLocation();
	const urlPath = location.pathname.slice(1);

	const initView = () => {
		const width = window.innerWidth;
		const outletElt = document.getElementById("outlet");
		const sidebarElt = document.getElementById("sidebar");
		const topbarElt = document.getElementById("topbar");
		if (width >= 800) {
			setDesktopMode(true);
			outletElt.style.marginLeft = "25vw";
			topbarElt.style.marginLeft = "25vw";
			sidebarElt.style.height = "100%";
		} else {
			setDesktopMode(false);
			outletElt.style.marginLeft = "0";
			topbarElt.style.marginLeft = "0";
			sidebarElt.style.height = "0";
		}
	};

	useEffect(() => {
		initView();
	}, []);

	window.addEventListener("resize", initView);

	const openMobileMenu = () => {
		const mobileMenuElt = document.getElementById("mobile-container");
		mobileMenuElt.classList.add("mobile-container-show");
	};

	const closeMobileMenu = () => {
		const mobileMenuElt = document.getElementById("mobile-container");
		mobileMenuElt.classList.remove("mobile-container-show");
	};

	return (
		<Wrapper>
			{!desktopMode && (
				<div className="btn btn-open" onClick={openMobileMenu}>
					<CiMenuBurger />
				</div>
			)}
			{desktopMode ? (
				<div className="container desktop-container">
					<article className="logo-container">
						<img src={logo} alt="main-logo" className="logo" />
					</article>
					<article className="title-container">
						<p>stocksTracker</p>
					</article>
					<article className="nav-container">
						<div className={`${urlPath === "stocks" ? "link-row active-row" : "link-row"}`}>
							<NavLink to="stocks" className="middle-col">
								Stocks
							</NavLink>
						</div>
						<div className={`${urlPath === "indexes" ? "link-row active-row" : "link-row"}`}>
							<NavLink to="indexes" className="middle-col">
								Indexes
							</NavLink>
						</div>
						<div className={`${urlPath === "forex" ? "link-row active-row" : "link-row"}`}>
							<NavLink to="forex" className="middle-col">
								Forex
							</NavLink>
						</div>
						<div className={`${urlPath === "saved" ? "link-row active-row" : "link-row"}`}>
							<NavLink to="saved" className="middle-col">
								Saved
							</NavLink>
						</div>
					</article>
					<article className="footer-container">
						<div className="align-text-left">
							<a href="https://john-doe-portfolio.netlify.app" target="_blank">
								made by John
							</a>
						</div>
						<div className="align-text-center">2024</div>
						<div className="align-text-right">
							<a href="https://twelvedata.com/" target="_blank">
								using 12DataAPI
							</a>
						</div>
					</article>
				</div>
			) : (
				<div className="container mobile-container" id="mobile-container">
					<div className="btn btn-close" onClick={closeMobileMenu}>
						<IoIosCloseCircleOutline />
					</div>
					<article className="logo-container">
						<img src={logo} alt="main-logo" className="logo" />
					</article>
					<article className="title-container">
						<p>stocksTracker</p>
					</article>
					<article className="nav-container">
						<div className={`${urlPath === "stocks" ? "link-row active-row" : "link-row"}`}>
							<NavLink to="stocks" className="middle-col" onClick={closeMobileMenu}>
								Stocks
							</NavLink>
						</div>
						<div className={`${urlPath === "indexes" ? "link-row active-row" : "link-row"}`}>
							<NavLink to="indexes" className="middle-col" onClick={closeMobileMenu}>
								Indexes
							</NavLink>
						</div>
						<div className={`${urlPath === "forex" ? "link-row active-row" : "link-row"}`}>
							<NavLink to="forex" className="middle-col" onClick={closeMobileMenu}>
								Forex
							</NavLink>
						</div>
						<div className={`${urlPath === "saved" ? "link-row active-row" : "link-row"}`}>
							<NavLink to="saved" className="middle-col" onClick={closeMobileMenu}>
								Saved
							</NavLink>
						</div>
					</article>
					<article className="footer-container">
						<div className="align-text-left">
							<a href="https://john-doe-portfolio.netlify.app" target="_blank">
								made by John
							</a>
						</div>
						<div className="align-text-center">2024</div>
						<div className="align-text-right">
							<a href="https://twelvedata.com/" target="_blank">
								using 12DataAPI
							</a>
						</div>
					</article>
				</div>
			)}
		</Wrapper>
	);
};

export default Sidebar;
