// components/LeagueTable.js
export default function LeagueTable({ title, teams }) {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{title}</h2>
            <div style={styles.table}>
                {teams.map((team, index) => (
                    <div key={index} style={styles.row}>
                        <div style={styles.position}>{index + 1}</div>
                        <div style={styles.teamName}>{team.name}</div>
                        <div style={styles.points}>{team.points} puntos</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#f2f2f2',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
    },
    title: {
        color: '#333',
        textAlign: 'center',
        marginBottom: '10px',
    },
    table: {
        borderTop: '1px solid #ddd',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    position: {
        fontWeight: 'bold',
    },
    teamName: {
        flex: 1,
        textAlign: 'left',
    },
    points: {
        fontWeight: 'bold',
    },
};
