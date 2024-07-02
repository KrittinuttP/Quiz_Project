import React, { useState } from 'react';
import FromCampaign from './components/FromCampaign';

function MainCampaign() {
    const [campaignMail, setCampaignMail] = useState({
        campaignName: '',
        subjectLine: '',
        emailContent: '',
    });
    return (
        <div>
            <h2>Campaign</h2>
            <FromCampaign campaignMail={campaignMail} setCampaignMail={setCampaignMail} />
        </div>
    );
}

export default MainCampaign;