import React from 'react';
import './footer.css'; 

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <div className="footer-content">
          <div className="footer-column">
            <h4 className="footer-heading">Explore top skills and certifications</h4>
            <ul className="footer-list">
              <li><a href="/browse/certification/aws-certifications/">Amazon Web Services (AWS) Certifications</a></li>
              <li><a href="/browse/certification/six-sigma-certifications/">Six Sigma Certifications</a></li>
              <li><a href="/browse/certification/microsoft-certifications/">Microsoft Certifications</a></li>
              <li><a href="/browse/certification/cisco-certifications/">Cisco Certifications</a></li>
              <li><a href="/browse/certification/tableau-certifications/">Tableau Certifications</a></li>
              <li><a href="/browse/certification/">See all Certifications</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Web Development</h4>
            <ul className="footer-list">
              <li><a href="/topic/web-development/">Web Development</a></li>
              <li><a href="/topic/javascript/">JavaScript</a></li>
              <li><a href="/topic/react/">React JS</a></li>
              <li><a href="/topic/angular/">Angular</a></li>
              <li><a href="/topic/java/">Java</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">IT Certifications</h4>
            <ul className="footer-list">
              <li><a href="/topic/amazon-aws/">Amazon AWS</a></li>
              <li><a href="/topic/aws-certified-cloud-practitioner/">AWS Certified Cloud Practitioner</a></li>
              <li><a href="/topic/microsoft-az-900/">AZ-900: Microsoft Azure Fundamentals</a></li>
              <li><a href="/topic/aws-certified-solutions-architect-associate/">AWS Certified Solutions Architect - Associate</a></li>
              <li><a href="/topic/kubernetes/">Kubernetes</a></li>
            </ul>
          </div>
{/* 
          <div className="footer-column">
            <h4 className="footer-heading">Leadership</h4>
            <ul className="footer-list">
              <li><a href="/topic/leadership/">Leadership</a></li>
              <li><a href="/topic/management-skills/">Management Skills</a></li>
              <li><a href="/topic/project-management/">Project Management</a></li>
              <li><a href="/topic/personal-productivity/">Personal Productivity</a></li>
              <li><a href="/topic/emotional-intelligence/">Emotional Intelligence</a></li>
            </ul>
          </div> */}

          <div className="footer-column">
            <h4 className="footer-heading">Data Science</h4>
            <ul className="footer-list">
              <li><a href="/topic/data-science/">Data Science</a></li>
              <li><a href="/topic/python/">Python</a></li>
              <li><a href="/topic/machine-learning/">Machine Learning</a></li>
              <li><a href="/topic/chatgpt/">ChatGPT</a></li>
              <li><a href="/topic/deep-learning/">Deep Learning</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
