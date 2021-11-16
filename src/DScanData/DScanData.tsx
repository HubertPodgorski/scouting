import React from 'react'
import { GrouppedData } from '../helpers'

interface Props {
    grouppedData: GrouppedData
}

const DScanData = ({grouppedData}: Props) => <div>
    {Object.entries(grouppedData.wrecks).map(([wreckName, wreckCount], index) => <div key={index}>
    {wreckName}: {wreckCount} <br/>
    </div>)}
</div>

export default DScanData