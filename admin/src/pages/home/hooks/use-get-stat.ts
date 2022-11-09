import { useEffect, useState } from 'react';
import { MONTHS, IDataForRender } from '../../../static-data/data/stat-data';

import { useAppSelector } from '../../../hooks/hookRedux';
import { selectStats } from '../../../features/users/users-slice';

export const useGetStat = () => {
    const data = useAppSelector((state) => selectStats(state));
    const [userStat, setUserStat] = useState([] as IDataForRender[]);

    useEffect(() => {
        data.map((i) => {
            setUserStat((prev) => [
                ...prev,
                {
                    name: MONTHS[i._id - 1],
                    'New Users': i.total,
                },
            ]);
        });
    }, [data]);

    return { userStat };
};
