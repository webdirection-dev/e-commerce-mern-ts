import React, { FC } from 'react'
import './TemplateName.scss'
import {useTemplateName} from './useTemplateName'

interface ITemplateNameProps {}

const TemplateName: FC<ITemplateNameProps> = () => {
    const {} = useTemplateName

    return(
        <div className='templateName'>
            TemplateName Component
        </div>
    )
}

export default TemplateName