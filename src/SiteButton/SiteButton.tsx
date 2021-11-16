import { Button } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
    onSitePick: (site: string) => void
    site: string
    children: ReactNode
}


const SiteButton = ({onSitePick, site, children}: Props) => <Button onClick={() => onSitePick(site)} variant="outlined">{children}</Button>


export default SiteButton