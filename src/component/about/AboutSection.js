import React from 'react';

import bia from '../../resource/images/bia.jpg';
const AboutSection = () => {
    return (
        <div>
        <div className="site-section border-bottom" data-aos="fade-up">
        <div className="container">
            <div className="row mb-5">
            <div className="col-md-6">
                <div className="block-16">
                <figure>
                    <img src={bia} alt="Image placeholder" className="img-fluid rounded"/>
                </figure>
                </div>
            </div>
            <div className="col-md-1" />
            <div className="col-md-5">
                <div className="site-section-heading pt-3 mb-4">
                <h2 className="text-black">Đồ Án Lập trình WWW</h2>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
};

export default AboutSection;