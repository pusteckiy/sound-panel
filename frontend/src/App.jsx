import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import Loading from "./pages/Loading";
import './styles/App.css';


function App() {
	const { storage } = useContext(Context)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			storage.checkAuth()
		}
	}, [storage])

	if (storage.isLoading) {
		return (
			<Loading />
		);
	}
	
	if (!storage.isAuth) {
		return (
			<Login />
		)
	}

	return (
		<Panel />
	)

}


export default observer(App);
