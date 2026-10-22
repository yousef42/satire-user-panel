import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Divider } from '@mui/material';
import { Avatar, IconButton, TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { alpha } from '@mui/material'; import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import moment from 'moment';
import jMoment from 'moment-jalaali';
import jmoment from 'jalali-moment';
import { satrexApi } from '../../../components/api';
import Trans, { transFn } from '../../../components/lang';
import convertTz from '../../../components/convertTz';
import {
    satrexBorderDarkColor,
    satrexGray,
    satrexSemiDarkerBlueDarkMode,
} from '../../../../styles/colors';
import satrexToast from '../../../components/satrexToast';
import LoadingButton from '../../../components/LoadingButton';

const useStyles = makeStyles((theme) => ({
    textAreaLight: {
        backgroundColor: 'white',
        borderColor: '#ced4da !important',
    },
    textAreaDark: {
        backgroundColor: satrexSemiDarkerBlueDarkMode,
        borderColor: `${satrexBorderDarkColor} !important`,
    },
    textArea: {
        borderRadius: 8,
        position: 'relative',
        border: '1px solid ',
        minHeight: '100px !important',
        width: '97.3%',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
            outline: 'none',
        },
    },
}));

export default function (props) {
    const [replyContent, setReplyContent] = useState('');
    const satrexTheme = useSelector((state) => state.layout.theme);
    const [repliesList, setRepliesList] = useState(props.messageDetail.replies);
    const [replyLoading, setReplyLoading] = useState(false);
    const sendReply = () => {
        setReplyLoading(true);
        satrexApi()
            .post('Ticket/sendReply', {
                startTicketId: props.messageDetail.startTicket.id,
                message: replyContent,
            })
            .then(({ data }) => {
                if (data.isSuccess) {
                    satrexToast(transFn('ReplySentSuccessfully'), 'success');
                    setRepliesList([
                        ...repliesList,
                        {
                            message: replyContent,
                            createdAtUtc: moment().format('YYYY-MM-DDTHH:mm:ss'),
                            writtenByUser: true,

                        },
                    ]);
                    setReplyContent('');
                } else {
                    satrexToast(data.Errors[0].Description, 'error');
                }
                setReplyLoading(false);
            }).catch((e) => {
            setReplyLoading(false);
        });
    };
    const classes = useStyles();

    const lang = useSelector((state) => state.user.language);
    return (
        <div>
            <Grid container style={{ width: '800px' }}>
                <Grid style={{ marginTop: '10px' }} size={12}>
          <span>
<Trans>topic</Trans>
              {' '}
              :
              {' '}
          </span>
                    {' '}
                    <span>{props.messageDetail.startTicket.title}</span>
                </Grid>
                <Grid style={{ marginTop: '10px' }} size={12}>
          <span>
<Trans>MessageText</Trans>
              {' '}
              :
              {' '}
          </span>
                    {' '}
                    <span>{props.messageDetail.startTicket.message}</span>
                </Grid>
                <Grid style={{ marginTop: '10px' }} size={4}>
          <span>
<Trans>sendDate</Trans>
              {' '}
              :
              {' '}
          </span>
                    <span>
            {
                props.messageDetail.startTicket.createdAtUtc
                !== '0001-01-01T00:00:00' && (
                    <>
                        {
                            lang === 'EN' && moment(props.messageDetail.startTicket.createdAtUtc).format(
                                'YYYY/MM/DD  HH:mm:ss',
                            )
                        }

                        {
                            lang === 'FA'
                            && `${jmoment(convertTz(props.messageDetail.startTicket.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss')
                            }    ${
                                jMoment(props.messageDetail.startTicket.createdAtUtc).format(
                                    'jYYYY/jMM/jDD',
                                )}`
                        }
                    </>
                )

            }
                    </span>
                </Grid>
                <Grid style={{ marginTop: '10px' }} size={4}>
          <span>
<Trans>RelevantDepartment</Trans>
              {' '}
              :
              {' '}
          </span>
                    <span>{props.messageDetail.department.title}</span>
                </Grid>
                <Grid style={{ marginTop: '10px' }} size={4}>
          <span>
<Trans>Priority</Trans>
              {' '}
              :
              {' '}
          </span>
                    <span>
            <Trans>{props.messageDetail.startTicket.priority}</Trans>
                    </span>
                </Grid>
            </Grid>
            <Divider style={{ marginTop: '10px' }} />
            <div style={{ maxHeight: '350px', overflow: 'auto' }}>
                {repliesList.map((item, index) => (
                    <Grid
                        key={index}
                        container
                        style={{
                            marginTop: 30,
                            position: 'relative',
                            flexDirection: item.writtenByUser ? 'row' : 'row-reverse',
                        }}
                    >
                        {
                            !item.writtenByUser
                            && (
                                <div style={{
                                    display: 'flex', width: '100%', flexDirection: 'row', direction: 'ltr',
                                }}
                                >
                                    <Avatar>{(item.writer).charAt(0)}</Avatar>
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                        <span style={{ position: 'relative', top: 10 }}>{item.writer}</span>
                                    </div>
                                </div>
                            )
                        }
                        <Grid
                            className={`commentDiv ${item.writtenByUser ? 'blueBox' : 'greenBox'}`}
                            style={{
                                marginLeft: 40,
                                borderTopRightRadius: item.writtenByUser ? 0 : 10,
                                borderTopLeftRadius: item.writtenByUser ? 10 : 0,
                            }}
                            size={6}>
                            {item.message}
                        </Grid>
                        <Grid
                            style={{ display: 'flex', flexDirection: item.writtenByUser ? 'row' : 'row-reverse' }}
                            size={2}>
                <span
                    className=""
                    style={{
                        fontSize: '9px',
                        position: 'absolute',
                        bottom: '2px',
                    }}
                >
                  {item.createdAtUtc !== '0001-01-01T00:00:00'
                      && `${jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss')
                      }     ${
                          jMoment(item.createdAtUtc).format('jYYYY/jMM/jDD')}`}
                </span>
                        </Grid>
                    </Grid>
                ))}
            </div>
            <Divider style={{ marginTop: '10px' }} />
            <Grid container>
                <Grid style={{ position: 'relative' }} size={1}>
                    <div style={{ position: 'absolute', bottom: '5px', right: '23px' }}>
                        <LoadingButton loading={replyLoading}>
                            <IconButton
                                disabled={replyLoading}
                                color="primary"
                                aria-label="add to shopping cart"
                                onClick={sendReply}

                            >
                                <SendIcon style={{ color: '#00b9ff' }} />
                            </IconButton>
                        </LoadingButton>
                    </div>

                </Grid>
                <Grid size={11}>
                    <TextareaAutosize
                        placeholder={transFn('answerText')}
                        aria-label="empty textarea"
                        style={{
                            marginTop: '10px',
                            fontSize: '15px',
                            color: satrexTheme ? satrexGray : 'white',
                        }}
                        id="bootstrap-textArea"
                        onChange={(e) => {
                            setReplyContent(e.target.value);
                        }}
                        className={`${classes.textArea} ${
                            satrexTheme ? classes.textAreaLight : classes.textAreaDark
                        }`}
                        value={replyContent}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
