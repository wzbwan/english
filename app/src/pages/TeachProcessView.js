import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AvTimerIcon from '@material-ui/icons/AvTimer';
const styles = theme => ({
    root: {
        width: '90%',
    },
    card: {
        
        marginLeft:8,
        marginRight:8,
        height: 1048
    },
    stepper: {
        paddingTop:0,
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

function getSteps() {
    return ['课程导入(10分钟)', '课程内容(25分钟)', '课程总结(8分钟)', '课程导入(10分钟)', '课程内容(25分钟)', '课程总结(8分钟)', '课程导入(10分钟)', '课程内容(25分钟)', '课程总结(8分钟)'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `介绍本课程的课程设计，提出问题：为什么电脑叫计算机？`;
        case 1:
            return '计算机的诞生历史原因\n计算机的发展过程\n计算机的特点\n计算机的组成部件';
        case 2:
            return `本次课程的总结，扩展阅读：《计算思维，大数据时代》。\n作业：五大部件加以区分。`;
        default:
            return '计算机的诞生历史原因\n计算机的发展过程\n计算机的特点\n计算机的组成部件';
    }
}

class TeachProcessView extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes, avatar, title, secTitle } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {avatar}
                        </Avatar>
                    }
                    title={<h2 style={{ padding: 0, margin: 0 }}>{title}</h2>}
                    subheader={secTitle}
                />
                <CardContent>
                    <Stepper className={classes.stepper} nonLinear={true} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step active={true} key={label}>
                                <StepLabel optional={<div> <AvTimerIcon style={{ display: "inline-block", verticalAlign: "middle" }} /><span>5分钟</span></div>}>
                                   {label}
                                
                                </StepLabel>
                                <StepContent>
                                    <Typography component="pre">{getStepContent(index)}</Typography>

                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </CardContent>
                <CardActions className={classes.actions} >

                </CardActions>
            </Card>
        );
    }
}

TeachProcessView.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(TeachProcessView);