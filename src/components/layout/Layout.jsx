import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styled from "styled-components";

const Wrapper = styled.main`
	#topbar {
		/* border: 2px solid red; */
		margin-left: 25vw;
		height: 14vh;
	}
	#sidebar {
		/* border: 2px solid green; */
		position: fixed;
		top: 0;
		bottom: 0;
		width: 25vw;
		z-index: 5;
	}
	#outlet {
		/* border: 2px solid violet; */
		margin-left: 25vw;
		min-height: 100vh;
		padding: 3rem;
	}
`;

const Layout = () => {
	return (
		<Wrapper>
			<div id="topbar">
				<Topbar />
			</div>
			<div id="sidebar">
				<Sidebar />
			</div>
			<div id="outlet">
				<Outlet />
			</div>
		</Wrapper>
	);
};

export default Layout;
