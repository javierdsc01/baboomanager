// pages/index.js
import LeagueTable from '../components/leagueTable';

export default function Home() {
    const teams = new Array(12).fill({ name: 'Jammin\'', points: 88 });

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1>BABOO MANAGER</h1>
                {/* Add navigation tabs here */}
            </div>
            <div style={styles.leagues}>
                <LeagueTable title="Esta Jornada" teams={teams} />
                <LeagueTable title="General" teams={teams} />
            </div>
        </div>
    );
}

const styles = {
    page: {
        backgroundColor: '#fff',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        backgroundColor: '#000',
        color: '#fff',
        padding: '10px',
        textAlign: 'center',
    },
    leagues: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
    },
};
