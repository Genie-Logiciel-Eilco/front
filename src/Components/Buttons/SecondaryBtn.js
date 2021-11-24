import React from "react";
import "./Buttons.scss";

function PrimaryBtn({ text , click}) {
    return <button className="btn btn-secondary" onClick={click}>{text}</button>;
}

export default PrimaryBtn;
