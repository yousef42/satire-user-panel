import React from 'react';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Trans from '../../../components/lang';

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

function Section({
 expanded, handleChange, title, body, panel, summary,
}) {
    const classes = useStyles();
    return (
        <Accordion
                expanded={expanded === panel}
                onChange={handleChange(panel)}
        >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}><Trans>{title}</Trans></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <p>

                                <Trans>{summary}</Trans>
                            </p>
                        </div>
                        <div style={{ width: '100%' }}>
                            {body}
                        </div>
                    </div>
                </AccordionDetails>
        </Accordion>
    );
}

export default Section;
