import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html'; // Importing stateToHTML from draft-js-export-html library
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function FromCampaign(props) {
    const { campaignMail, setCampaignMail } = props;
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

    // Function to convert Draft.js content state to HTML using stateToHTML from draft-js-export-html
    const draftToHtmlContent = () => {
        if (campaignMail.emailContent) {
            const contentState = convertFromRaw(JSON.parse(campaignMail.emailContent));
            return stateToHTML(contentState);
        }
        return '';
    };

    const submitCampaign = () => {
        alert('Created campaign mail successfully');
        console.log(campaignMail)
    };

    return (
        <div>
            <p>Campaign Name:
                <input
                    type='text'
                    name="campaignName"
                    value={campaignMail.campaignName}
                    onChange={onChangeCampaign}
                />
            </p>
            <p>Subject Line:
                <input
                    type='text'
                    name="subjectLine"
                    value={campaignMail.subjectLine}
                    onChange={onChangeCampaign}
                />
            </p>
            <p>Email Content:</p>
            <div>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                />
            </div>
            <button onClick={submitCampaign}>Submit Campaign</button>
            <br />
            <p>Campaign Name: {campaignMail.campaignName}</p>
            <p>Subject Line: {campaignMail.subjectLine}</p>
            <p>Email Content: <div dangerouslySetInnerHTML={{ __html: draftToHtmlContent() }} /></p>
        </div>
    );
}

export default FromCampaign;
