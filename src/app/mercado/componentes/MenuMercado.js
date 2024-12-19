import styles from "../page.module.css";
import BotonMenu from "./BotonMenu";

const menuItems = ["Comprar",  "Vender"];

export default function MenuMercado({ activeTab, setActiveTab }) {
    return (
        <nav className={styles.display}>
            <ul className={styles.navbar1}>
                {menuItems.map((item, index) => (
                    <BotonMenu
                        key={item}
                        activeTab={activeTab}
                        name={item}
                        setActiveTab={setActiveTab}
                        index={index}
                    />
                ))}
            </ul>
        </nav>
    );
}