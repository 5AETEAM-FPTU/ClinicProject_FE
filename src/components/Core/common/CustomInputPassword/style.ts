import { Input } from 'antd'
import styled from 'styled-components'

export const CustomInputPasswordStyled = styled(Input.Password)`
   &&&.ant-input-password {
        border-color: #003553 !important;
        background-color: transparent !important;
        padding: 0.75rem 1.25rem !important;
        font-size: 1rem !important;
        font-weight: 500 !important;
        color: #003553 !important;

        input::placeholder {
            color: #003553 !important;
            opacity: 0.6 !important;
        }
    }

    &&&.ant-input-password input {
        border-color: #003553 !important;
        color: #003553 !important;
    }

    &&&.ant-input-password input:focus {
        border-color: #005f7d !important; /* Different border color on focus if needed */
    }
`
