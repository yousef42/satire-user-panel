import React, {useState} from "react";
import {ScaleLoader} from "react-spinners";
import {css} from "@emotion/react";
import {satrexGreen} from "../../styles/colors";

export default (props) => {
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    position:absolute;
    top:24%;
  `;
    let [color, setColor] = useState(satrexGreen);
    return (
        <>


            <div style={{
                display: 'flex',position: 'relative',alignItems: 'center',justifyContent:'center'
            }}>
                {props.children}
                {
                    props.loading && (<ScaleLoader
                    color={color}
                    loading={props.loading}
                    css={override}
                    height={15}
                    width={3}
                />)
                }
            </div>

        </>
    );
};
