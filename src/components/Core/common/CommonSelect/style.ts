import { Select } from 'antd'
import styled from 'styled-components'

export const CommonSelectStyled = styled(Select)`
    &&&.ant-select-selector {
        border: 1px solid #000;

        border-color: rgba(34, 34, 34, 0.6); 
        &:hover,
        &:focus {
            border-color: #2c2c2c;
        }
    }

    &&&.ant-select-selection-placeholder {
        color: rgba(
            34,
            34,
            34,
            0.6
        ); 
    }

    &&&.ant-select-selector:focus-within:hover {
        border-color: #2c2c2c !important; /* Giống với focus:hover:!border-secondarySupperDarker */
    }
`
