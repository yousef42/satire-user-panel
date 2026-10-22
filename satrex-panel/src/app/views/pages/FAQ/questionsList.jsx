import React from 'react';
import { makeStyles } from '@mui/styles';
import { Accordion } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import Trans from '../../../components/lang';
import { satrexGreen } from '../../../../styles/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '100%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function ControlledAccordions() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={`${classes.root} footerPage`}>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography
                        className={classes.heading}
                    >
<Trans>HowDoessatrexWork?(HowDoessatrexWork?)</Trans>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>howsatrexWork</Trans></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>
                        <Trans>WhyIssatrexTrusted?</Trans>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>faqPageDescriptionLine1</Trans></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>
                        <Trans>HowToRegisterInsatrex?</Trans>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>answerOfregistration</Trans></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>
                        <Trans>faqPageDescriptionLine2</Trans>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>faqPageDescriptionLine3</Trans></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel5'}
                onChange={handleChange('panel5')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}><Trans>faqPageDescriptionLine4</Trans></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>faqPageDescriptionLine5</Trans></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel6'}
                onChange={handleChange('panel6')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}><Trans>faqPageDescriptionLine6</Trans></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>faqPageDescriptionLine7</Trans></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel7'}
                onChange={handleChange('panel7')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}><Trans>faqPageDescriptionLine8</Trans></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>faqPageDescriptionLine9</Trans></Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Typography><Trans>faqPageDescriptionLine10</Trans></Typography>
                </AccordionDetails>
            </Accordion>
            {/* <Accordion */}
            {/*  expanded={expanded === "panel8"} */}
            {/*  onChange={handleChange("panel8")} */}
            {/* > */}
            {/*  <AccordionSummary */}
            {/*    expandIcon={<ExpandMoreIcon />} */}
            {/*    aria-controls="panel4bh-content" */}
            {/*    id="panel4bh-header" */}
            {/*  > */}
            {/*    <Typography className={classes.heading}><Trans>faqPageDescriptionLine11</Trans></Typography> */}
            {/*  </AccordionSummary> */}
            {/*  <AccordionDetails> */}
            {/*    <Typography>...</Typography> */}
            {/*  </AccordionDetails> */}
            {/* </Accordion> */}
            <Accordion
                expanded={expanded === 'panel9'}
                onChange={handleChange('panel9')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}><Trans>faqPageDescriptionLine12</Trans></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Trans>faqPageDescriptionLine13</Trans>
                        .
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel10'}
                onChange={handleChange('panel10')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}><Trans>faqPageDescriptionLine14</Trans></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Trans>faqPageDescriptionLine15</Trans>
                        .
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel11'}
                onChange={handleChange('panel11')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}><Trans>faqPageDescriptionLine16</Trans></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>transferMoneyDate</Trans></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel12'}
                onChange={handleChange('panel12')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}><Trans>faqPageDescriptionLine17</Trans></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>faqPageDescriptionLine18</Trans></Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel13'}
                onChange={handleChange('panel13')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}><Trans>faqPageDescriptionLine19</Trans></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><Trans>supportTeamWorkTime</Trans></Typography>
                </AccordionDetails>
            </Accordion>

           <div style={{ paddingBottom: 20 }}>
               <p style={{ marginTop: '30px', color: 'red' }}>
                   <Trans>faqPageDescriptionLine20</Trans>
               </p>
               <Link to="/support" style={{ color: satrexGreen }}><Trans>SendMessageToBackup</Trans></Link>
           </div>
        </div>

    );
}
