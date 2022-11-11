import { useEffect, useState } from 'react';
import { MONTHS, IDataForRender } from '../../../static/data/stat-data';

import { useAppSelector } from '../../../static/hooks/hookRedux';
import { selectUsersInfo } from '../../../features/users/users-slice';

export const useGetStat = () => {
    const {statsUsers} = useAppSelector((state) => selectUsersInfo(state));
    const [userStat, setUserStat] = useState([] as IDataForRender[]);

    useEffect(() => {
        statsUsers.map((i) => {
            setUserStat((prev) => [
                ...prev,
                {
                    name: MONTHS[i._id - 1],
                    'New Users': i.total,
                },
            ]);
        });
    }, [statsUsers]);

    return { userStat };
};
