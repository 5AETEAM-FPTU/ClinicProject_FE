import React from 'react'
import  * as S from './style'

interface CommonSelectProps {
    children: React.ReactNode;
    [key: string]: any; 
  }

export default function CommonSelect({props, children}: CommonSelectProps) {
    return (
       <S.CommonSelectStyled {...props}>{children}</S.CommonSelectStyled>
    )
}
