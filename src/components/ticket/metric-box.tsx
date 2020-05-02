import React from 'react'
import { Analysis } from '../../models/analysis';

interface MetricBoxProps {
    analysis: Analysis
}

export function MetricBox(props: MetricBoxProps) {
    const { analysis } = props;
    return (
        <div className="container">
            <div className="icon" style={{ backgroundImage: "url(" + analysis.iconUrl + ")", }} ></div>
            <div className="title">{analysis.value}</div>
            <div className="sub-title">{analysis.title}</div>
        </div>
    );
}