import React, { useEffect } from "react";
import { Wrapper } from "../../css/PageStyleForex";
import Converter from "../sub-components/Converter";
import ParitiesActual from "../sub-components/ParitiesActual";
import ParitiesHistory from "../sub-components/ParitiesHistory";
import { notify, Toaster } from "../../css/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLimit } from "../../slices/app/appSlice";

const Forex = () => {
	const dispatch = useDispatch();
	const { isLimit } = useSelector((store) => store.app);

	if (isLimit) {
		notify();
	}

	useEffect(() => {
		//cleanup
		return () => {
			dispatch(updateIsLimit(false));
		};
	}, []);

	return (
		<Wrapper>
			<Toaster />
			<article className="converter">
				<Converter />
			</article>
			<article className="parities-actual">
				<ParitiesActual />
			</article>
			<article className="parities-history">
				<ParitiesHistory />
			</article>
		</Wrapper>
	);
};

export default Forex;
