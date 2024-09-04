import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Stocks from "./components/pages/Stocks";
import Indexes from "./components/pages/Indexes";
import Forex from "./components/pages/Forex";
import Saved from "./components/pages/Saved";
import NotFound from "./components/sub-components/NotFound";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Navigate to="stocks" /> },
			{ path: "stocks", element: <Stocks /> },
			{ path: "indexes", element: <Indexes /> },
			{ path: "forex", element: <Forex /> },
			{ path: "saved", element: <Saved /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
