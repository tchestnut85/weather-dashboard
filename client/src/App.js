import { Dashboard } from './pages/Dashboard';
import { Header } from './components/Header';
import { WeatherProvider } from './utils/context/WeatherState';

function App() {
	return (
		<div className='App'>
			<WeatherProvider>
				<Header />
				<Dashboard />
			</WeatherProvider>
		</div>
	);
}

export default App;
