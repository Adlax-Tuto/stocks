import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const message = "API limits reached. Some functionalities may not work. Reload page in a minute.";

export const notify = () => toast(message, { autoClose: 1000, closeOnClick: true });

export const Toaster = styled(ToastContainer)`
	.Toastify__toast {
		background-color: var(--clr-poppy-5);
	}
	.Toastify__toast-body {
		color: var(--clr-prussian-blue-5);
	}
`;
