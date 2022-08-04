import React, { useState, useEffect } from "react";
import {
	AppBar,
	Toolbar,
	FormGroup,
	FormControlLabel,
	Switch,
	Typography,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useStore } from "context/StoreProvider";
import { showEvents, hideEvents } from "context/web3Actions";

const Header = () => {
	const [state, dispatch] = useStore();
	const [showEventsStatus, setShowEventsStatus] = useState(true);

	useEffect(() => {
		if (showEventsStatus) {
			showEvents(state, dispatch);
		} else {
			hideEvents(state, dispatch);
		}
		// eslint-disable-next-line
	}, [showEventsStatus]);

	const handleChange = (event) => {
		setShowEventsStatus(event.target.checked);
	};

	return (
		<div>
			<AppBar>
				<Toolbar>
					<StorefrontIcon
						edge="start"
						sx={{
							marginRight: 2,
						}}
					/>
					<Typography
						variant="h6"
						sx={{
							flexGrow: 1,
						}}
					>
						ChainList
					</Typography>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									color="secondary"
									onChange={handleChange}
									checked={state.showEvents}
								/>
							}
							label="Show Events"
						/>
					</FormGroup>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
