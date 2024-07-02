import React, { useState, useEffect } from 'react';
import { Col, Row, Input, Button, message } from 'antd';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function FromCampaign(props) {
    const { campaignMail, setCampaignMail } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const [editorState, setEditorState] = useState(() =>
        campaignMail.emailContent
            ? EditorState.createWithContent(convertFromRaw(JSON.parse(campaignMail.emailContent)))
            : EditorState.createEmpty()
    );

    useEffect(() => {
        return () => {
            // Cleanup function to handle component unmounting
        };
    }, []);

    const onChangeCampaign = (event) => {
        const { name, value } = event.target;
        setCampaignMail({
            ...campaignMail,
            [name]: value
        });
    };

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        const contentState = editorState.getCurrentContent();
        setCampaignMail({
            ...campaignMail,
            emailContent: JSON.stringify(convertToRaw(contentState))
        });
    };

    const submitCampaign = () => {
        messageApi.open({
            type: 'success',
            content: 'Created campaign mail successfully',
            style: {
                marginTop: '20vh',
            },
        });
        console.log(campaignMail)
        // sendEmail(campaignMail.emailContent);
    };






    // const sendEmail = (htmlContent) => {
    //     axios.post('/send-email', { htmlContent })
    //         .then(response => console.log('Created campaign mail successfully ', response))
    //         .catch(error => console.error('Error sending email:', error));
    // };

    return (
        <>
            <Row>
                <Col span={4}></Col>
                <Col span={4}>
                    <p>Campaign Name:</p>
                </Col>
                <Col span={8}>
                    <Input
                        type='text'
                        name="campaignName"
                        value={campaignMail.campaignName}
                        onChange={onChangeCampaign}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={4}></Col>
                <Col span={4}>
                    <p>Subject Line</p>
                </Col>
                <Col span={8}>
                    <Input
                        type='text'
                        name="subjectLine"
                        value={campaignMail.subjectLine}
                        onChange={onChangeCampaign}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={4}></Col>
                <Col span={4}>
                    <p>Email Content</p>
                </Col>
                <Col span={8}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        wrapperStyle={{
                            border: "1px solid #F1F1F1"
                            , marginBottom: "20px"
                        }}
                        editorStyle={{
                            height: "300px"
                            , padding: "10px"
                        }}

                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {contextHolder}
                    <Button type="primary" onClick={submitCampaign}>
                        Submit Campaign
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default FromCampaign;
