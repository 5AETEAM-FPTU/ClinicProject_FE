import React from 'react'
import * as S from './style'
import { InputProps } from 'antd/lib/input';

interface CustomInputPasswordProps extends InputProps {}
function CustomInputPassword(props: CustomInputPasswordProps ) {
    return (
        <S.CustomInputPasswordStyled {...props}/>
    )
}

export default CustomInputPassword
