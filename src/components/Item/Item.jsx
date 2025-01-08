import styles from './Item.module.scss';
import { MdNavigateNext } from 'react-icons/md';

function Item() {
    return (
        <div className={styles.item}> {/*block-element-modifier-nimeämiskäytäntö*/}
            <div className={styles.item_data}>
                <div className={styles.item_type}>Sähkö</div>
                <div className={styles.item_amount}>185,50 €</div>
                <div className={styles.item_date}>1.2.2025</div>
                <div className={styles.item_timespan}>1.10.2024 – 1.1.2025</div>
                <div className={styles.item_receiver}>Helen Oy</div>
                <div className={styles.item_average}>61,84 €/kk</div>
            </div>
            <div className={styles.item_edit}>
                <MdNavigateNext />
            </div>
        </div>
    )
}

export default Item