import React from "react";
import "./Buttons.scss";

function PrimaryBtn({ text }) {
    return <button className="btn btn-secondary">{text}</button>;
}

export default PrimaryBtn;