import styles from '../page.module.css';

export default function BotonMenu({ activeTab, name, setActiveTab, index }) {
    return (
        <li>
            <button
                className={activeTab === index ? styles.active : ''}
                onClick={() => setActiveTab(index)}
            >
                {name}
            </button>
        </li>
    );
}