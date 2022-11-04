import {SyntheticEvent, FC, Dispatch, SetStateAction} from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

interface IAppSnackbar {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    txt: string;
}

const AppSnackbar: FC<IAppSnackbar> = ({isOpen, setIsOpen, txt}) => {
    const message = 'Product added to ' + txt

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setIsOpen(false);
    }

        return(
            <Snackbar
                open={isOpen}
                onClose={handleClose}
                autoHideDuration={1000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                style={{top: "2.5px", right: `${txt === 'cart' ? '60' : '110'}px`}}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}
                    className={txt !== 'cart' ? 'alert-wishlist' : undefined}
                >{message}</Alert>
            </Snackbar>
        )
}

export default AppSnackbar