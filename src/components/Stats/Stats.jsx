import styles from './Stats.module.scss';
import { Cell } from 'recharts';
import { LabelList, Legend, Pie, PieChart } from 'recharts';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import randomColor from 'randomcolor';

function Stats(props) {

    const linedata = props.data.map(
        (item) => ({
            date: new Date(item.paymentDate).getTime(),
            amount: item.amount
        })
    );

    const locale = "fi-FI";

    const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });

    const reducer = (resultData, item) => {
        // Selvitetään, löytyykö alkion kulutyyppi tulostaulukosta
        const index = resultData.findIndex(arrayItem => arrayItem.type === item.type);
        if (index >= 0) {
            // Löytyy -> kasvatetaan kokonaissummaa.
            resultData[index].amount = resultData[index].amount + item.amount
        } else {
            // Ei löydt -> lisätään tulostaulukkoon.
            resultData.push({type: item.type, amount: item.amount})
        }
        return resultData;
    }

    const piedata = props.data.reduce(reducer, []);

    const piecolors = randomColor({ count: piedata.length,
                                    seed: 'siemenluku',
                                    luminosity: 'dark'
     });

    return (
        <div className={styles.stats}>
            <h2>Tilastot</h2>
            <h3>Kulut aikajanalla</h3>
            <ResponsiveContainer height={350}>
                <LineChart data={linedata}>
                    <Line dataKey='amount' />
                    <XAxis  type='number'
                            dataKey='date'
                            domain={['dataMin', 'dataMax']} 
                            tickFormatter={
                                value => new Date(value).toLocaleDateString(locale)
                            } />
                    <YAxis />
                    <Tooltip labelFormatter={
                        value => new Date(value).toLocaleDateString(locale)
                    }
                    formatter={
                        value => [numberFormat.format(value), "summa"]
                    } />
                </LineChart>
            </ResponsiveContainer>
            <h3>Kulut kulutyypeittäin</h3>
            <ResponsiveContainer height={350}>
                <PieChart>
                    <Pie data={piedata} dataKey='amount' nameKey='type'>
                        <LabelList  dataKey='amount'
                                    position='inside'
                                    formatter={value => numberFormat.format(value) 
                                    } />
                        { piecolors.map( color => <Cell fill={color} key={color} />)}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={ value => numberFormat.format(value)} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Stats;