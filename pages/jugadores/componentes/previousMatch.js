import Image from 'next/image';
import styles from './previousMatch.module.css';

export default function PreviousMatch() {
    return (
        <div className={styles.previousMatch}>
            <p className={styles.previousMatchHeader}>Laliga Easports J.38</p>
            <div className={styles.previousMatchResult}>
                <Image src="/atletico.png" className={styles.previousMatchTeam} alt="Atletico" width={65} height={82} />
                <p>2-1</p>
                <Image src="/atletico.png" className={styles.previousMatchTeam} alt="Atletico" width={65} height={82} />
            </div>
        </div>
    );
}