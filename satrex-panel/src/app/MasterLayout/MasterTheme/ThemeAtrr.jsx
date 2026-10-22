import {
    satrexDarkColor1,
    satrexDarkColor2,
    satrexDarkColor3,
    satrexDarkColor4,
    satrexDarkColor5, satrexDarkColor6
} from "../../../styles/colors";

const theme = {
    gray:{
        topbarStyle:{
            backgroundColor: satrexDarkColor1
        },
        contentStyle:{
            backgroundColor: satrexDarkColor3
        },
        footerStyle:{
            backgroundColor: satrexDarkColor4
        },
        footerHr:{
          borderColor:satrexDarkColor6
        },
        sidebarStyle:{
            backgroundColor: satrexDarkColor2
        },
        submenuStyle:{
            backgroundColor: satrexDarkColor5
        },
        cardStyle:{
            backgroundColor: satrexDarkColor2,
        },
        tableStyle:{
            rowStyle:{
                backgroundColor: satrexDarkColor5,
            },
            headStyle:{
                backgroundColor: '#232323',
            },
            rowHoverStyle:{
                backgroundColor: satrexDarkColor6,
            }
        },
        inputStyle:{
            backgroundColor: satrexDarkColor5
        },
        popupStyle:{
            backgroundColor : satrexDarkColor4
        },
        addressInput:{
            backgroundColor : 'rgb(24,24,27)'
        }
    }
}
export const availTheme = theme
export default (extraTheme,condition = false)=>{

    if(condition)
    {
        if(extraTheme !== true && extraTheme)
            return theme[extraTheme];
        return false
    }
    return (extraTheme && extraTheme !== true ) ?  theme[extraTheme]: {}
}