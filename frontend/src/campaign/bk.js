import React, { useState } from 'react';
import FromCampaign from './components/FromCampaign';

function MainCampaign() {
    const [campaignMail, setCampaignMail] = useState({
        campaignId: '',
        campaignName: '',
        subjectLine: '',
        emailContent: '',
        recipients: [],
        sendDate: ''  
    });

    const updateCampaign = () => {
        const newCampaign = {
            campaignId: '123',
            campaignName: 'New Campaign',
            subjectLine: 'New Subject',
            emailContent: 'Email content here',
            recipients: ['recipient1@example.com', 'recipient2@example.com'],
            sendDate: '2024-06-22T12:00:00Z'
        };
        setCampaignMail(newCampaign);
    };

    return (
        <div>
            <h2>Campaign</h2>
            <button onClick={updateCampaign}>Update Campaign</button>
            {/* <p>Campaign ID: {campaignMail.campaignId}</p>
            <p>Campaign Name: {campaignMail.campaignName}</p>
            <p>Subject Line: {campaignMail.subjectLine}</p>
            <p>Email Content: {campaignMail.emailContent}</p>
            <p>Recipients: {campaignMail.recipients.join(', ')}</p>
            <p>Send Date: {campaignMail.sendDate}</p> */}
            <FromCampaign campaignMail={campaignMail} setCampaignMail={setCampaignMail} />
        </div>
    );
}

export default MainCampaign;