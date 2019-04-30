import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TeachingPlanCard from '../components/TeachingPlanCard';
import PlanTitle from '../components/PlanTitle';
import TeachProcessView from './TeachProcessView';

function mapStateToProps(state) {
    return {

    };
}

const plan = [
    {
        title: "教学目标",
        avatar:"标",
        secTitle: "本节课要达到的目的及要求",
        content: "让学生了解计算机诞生的历史原因和它发展现状以及现实生活中的应用。"
    },
    {
        title: "上节回顾",
        avatar: "顾",
        secTitle: "上节课重点内容复习",
        content: "无"
    },
    {
        title:"重点知识",
        avatar: "重",
        secTitle:"本节课的核心知识点",
        content:"组成计算机的五大部件。"
    },
    {
        title: "难点知识",
        avatar: "难",
        secTitle: "本节课的难点部分",
        content: "计算机五大部件在现实生活中的辨认。"
    },
    {
        title: "形式及手段",
        avatar: "法",
        secTitle: "需要用到的教具、组织形式及教学策略",
        content: "多媒体课件演示、视频演示、实物展示。"
    },
    {
        title: "扩展及作业",
        avatar: "扩",
        secTitle: "与本节课内容相关的材料及课后作业练习",
        content: "写出组装计算机时使用到的各种配件，并归类到计算机五大部件中。"
    },
]

class TeachingPlanView extends Component {
    render() {
        return (
            <div>
                <Grid container spacing={8}>
                <Grid item xs={9}>
                    <PlanTitle title="计算机基础知识" subTitle="2018年3月4日" />
                </Grid>
                <Grid item xs={3}>
                    <PlanTitle title="1/32" />
                </Grid>
                {plan.map((section, index) => {
                    return (
                        <Grid item xs={6} md={6}>
                            <TeachingPlanCard key={index} title={section.title} secTitle={section.secTitle} avatar={section.avatar} content={section.content} />
                        </Grid>
                    )
                })}
                <Grid item xs={12}>
                    <TeachProcessView title="教学过程" secTitle="" avatar="过程" />
                </Grid>
                </Grid>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(TeachingPlanView);