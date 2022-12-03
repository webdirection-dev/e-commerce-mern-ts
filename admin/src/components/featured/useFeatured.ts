import {useEffect, useState} from "react"
import {useAppSelector} from "../../static/hooks/hookRedux"
import {selectOrdersInfo} from "../../features/orders/orders-slice"
import {buildStyles} from "react-circular-progressbar"

export const useFeatured = () => {
    const {income} = useAppSelector(store => selectOrdersInfo(store))
    const [percent, setPercent] = useState(0)
    const [total, setTotal] = useState(0)
    const [progressStyles, setProgressStyles] = useState({} || undefined)

    useEffect(() => {
        if (income.length === 1) {
            setTotal(income[0].total)
        }

        if (income.length > 1) {
            const totalOut = income.reduce((prev, curr) => prev + curr.total, 0)
            const incomeOut = ((income[1].total * 100) / income[0].total - 100).toFixed(1)

            setPercent(+incomeOut)
            setTotal(+totalOut)
        }
    }, [income])

    useEffect(() => {
        if (percent < 0) {
            setProgressStyles(buildStyles({textColor: "red"}))
        } else setProgressStyles(undefined)
    }, [percent])

    return {income, percent, total, progressStyles}
}
