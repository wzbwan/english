import React, { Component } from 'react';
import "./PlanTitle.css";

class PlanTitle extends Component {
    render() {
        const {title, subTitle} = this.props;
        return (
            <div className="planTitle-container">
                <h2 className="planTitle">{title}</h2>
                <p className="subTitle">{subTitle}</p>
            </div>
        );
    }
}

export default PlanTitle;