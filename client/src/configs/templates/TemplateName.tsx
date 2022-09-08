import React, { FC } from 'react'

import {useTemplateName} from './useTemplateName'
import {Container} from './styledTemplateName'

interface ITemplateNameProps {}

const TemplateName: FC<ITemplateNameProps> = () => {
    const {} = useTemplateName

    return(
        <Container>
            TemplateName Component
        </Container>
    )
}

export default TemplateName