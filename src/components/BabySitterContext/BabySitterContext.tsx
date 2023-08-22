import React, { createContext, useContext, useState, useEffect } from "react";
import { playersList } from "../../data/players";
export interface BabySitterContextProviderProps {
	children?: React.ReactChild | React.ReactChild[];
	anyAdditionalFunctions?: () => void | undefined;
}
type BabySitterPlayer = Record<string, boolean>;
interface BabySitterContextValues {
	players: BabySitterPlayer;
	showLengthInMinutes: number;
	hasShowStarted: boolean;
	currentTab: number;
	gapRanges: number[];
	updatePlayer: (player: string) => void;
	setShowLength: (length: number) => void;
	setShowStarted: () => void;
	handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
	handleGapRangeChange: (event: Event, newValue: number | number[]) => void;
	deletePlayer: (player?: string) => void;
}

const BabySitterContext = createContext<BabySitterContextValues>({
	players: {},
	showLengthInMinutes: 20,
	hasShowStarted: false,
	currentTab: 0,
	gapRanges: [30, 120],
	updatePlayer: () => {},
	setShowLength: () => {},
	setShowStarted: () => {},
	handleTabChange: () => {},
	handleGapRangeChange: () => {},
	deletePlayer: () => {},
});
export const BabySitterContextProvider: React.FC<
	BabySitterContextProviderProps
> = ({ children, anyAdditionalFunctions }) => {
	const [playersAll, setActivePlayer] = useState({});
	const [activePlayers, setListOfPlayers] = useState<string[]>([]);
	const [showLengthInMinutes, setShowLength] = useState<number>(20);
	const [hasShowStarted, setShowStarted] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState<number>(0);
	const [logs, setLogs] = useState<string[]>([]);
	const [gapRanges, setGapRanges] = useState<number[]>([30, 120]);

	const deletePlayer = (player?: string) => {};

	const addToLog = (str: string) => {
		const newLog = `: ${str}`;
		setLogs((prevLogs) => [...prevLogs, newLog]);
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setCurrentTab(newValue);
	};

	const handleGapRangeChange = (event: Event, newValue: number | number[]) => {
		setGapRanges(newValue as number[]);
	};

	const setHasShowStarted = () => {
		setShowStarted((prevValue) => !prevValue);
	};

	const updatePlayer = (playerName: string) => {
		const temp: BabySitterPlayer = playersAll;
		temp[playerName] = !temp[playerName];
		setActivePlayer((prevPlayers) => ({ ...prevPlayers, ...temp }));
	};

	const buildInitialPlayers = () => {
		let players: BabySitterPlayer = {};
		playersList.forEach((player) => {
			const key = `${player}`;
			players[key] = true;
		});
		setActivePlayer(players);
	};

	useEffect(() => {
		buildInitialPlayers();
	}, []);

	useEffect(() => {
		const allActivePlayers: string[] = [];
		for (const [key, value] of Object.entries(playersAll)) {
			if (value === true) allActivePlayers.push(key);
		}
		setListOfPlayers(allActivePlayers);
	}, [playersAll]);

	useEffect(() => {
		console.log({ activePlayers, showLengthInMinutes, hasShowStarted });
	}, [activePlayers, showLengthInMinutes, hasShowStarted]);

	return (
		<BabySitterContext.Provider
			value={{
				players: playersAll,
				showLengthInMinutes,
				hasShowStarted,
				currentTab,
				gapRanges,
				updatePlayer,
				setShowLength,
				setShowStarted: setHasShowStarted,
				handleTabChange,
				handleGapRangeChange,
				deletePlayer,
			}}
		>
			{children}
		</BabySitterContext.Provider>
	);
};

export const useBabySitterContext = () => {
	const value = useContext(BabySitterContext);
	return value;
};
