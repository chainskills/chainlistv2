import { forwardRef, useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useStore } from "context/StoreProvider";
import { reloadArticles } from "context/web3Actions";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Events = () => {
	const [state, dispatch] = useStore();
	const [open, setOpen] = useState(false);

	const handleClose = (event, reason) => {
		setOpen(false);
	};

	useEffect(() => {
		setOpen(state.showEvents);
		reloadArticles(dispatch);
		// eslint-disable-next-line
	}, [state.eventTimeStamp]);

	return (
		<div>
			{state.eventTimeStamp !== null && (
				<Snackbar
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				>
					<Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
						{state.eventMessage}
					</Alert>
				</Snackbar>
			)}
		</div>
	);
};

export default Events;
