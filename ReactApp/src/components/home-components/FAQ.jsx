
import "../../styles/faq.css";

// Component that contains the FAQs a student might have
const FAQ = () => {
  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      
      {/* Question 1 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-1"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-1" className="faq-item-question">
          How is my privacy protected on this platform?
        </label>
        <div className="faq-item-answer">
          <p>
            We take privacy seriously. All interactions on this platform are confidential, and your personal data is stored securely.
          </p>
          <ul>
            <li>
              All communications between you and the professionals are encrypted to ensure privacy.
            </li>
            <li>
              You can remain anonymous when interacting with other students.
            </li>
            <li>
              We do not share your personal information with third parties.
            </li>
          </ul>
        </div>
      </div>
      
      {/* Question 2 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-2"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-2" className="faq-item-question">
          What support can I expect from the counselors?
        </label>
        <div className="faq-item-answer">
          <p>
            Our platform provides professional support from licensed counselors who are trained to help students facing bullying or emotional difficulties.
          </p>
          <ul>
            <li>
              You can schedule one-on-one sessions with a counselor.
            </li>
            <li>
              There is a forum for peer support, where you can share experiences anonymously.
            </li>
            <li>
              The counselors can provide coping strategies, emotional support, and practical advice on handling difficult situations.
            </li>
          </ul>
        </div>
      </div>
      
      {/* Question 3 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-3"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-3" className="faq-item-question">
          Is my data secure on this platform?
        </label>
        <div className="faq-item-answer">
          <p>
            Yes, we use industry-standard security protocols to protect your data.
          </p>
          <ul>
            <li>
              All data is encrypted in transit and at rest.
            </li>
            <li>
              Access to your data is restricted to authorized personnel only.
            </li>
            <li>
              You can request deletion of your data at any time.
            </li>
          </ul>
        </div>
      </div>
      
      {/* Question 4 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-4"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-4" className="faq-item-question">
          Can I remain anonymous?
        </label>
        <div className="faq-item-answer">
          <p>
            Yes, anonymity is an option when interacting with other students on the platform. However, counselors may need basic information to provide appropriate support.
          </p>
        </div>
      </div>

      {/* Question 5 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-5"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-5" className="faq-item-question">
          How do I report inappropriate content or behavior?
        </label>
        <div className="faq-item-answer">
          <p>
            If you encounter inappropriate content or behavior on the platform, please report it immediately through our contact form or by notifying a moderator.
          </p>
          <ul>
            <li>
              Use the "Report" button located on each post.
            </li>
            <li>
              Contact a moderator directly for urgent issues.
            </li>
            <li>
              All reports are reviewed and handled confidentially by our team.
            </li>
          </ul>
        </div>
      </div>

      {/* Question 6 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-6"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-6" className="faq-item-question">
          Where can I access emergency services?
        </label>
        <div className="faq-item-answer">
          <p>
            If you need urgent help, we recommend contacting your local emergency services. We also provide links to various helplines and resources on the platform.
          </p>
          <ul>
            <li>
              Emergency contacts are listed on the "Help" page.
            </li>
            <li>
              Our counselors can guide you on how to reach the nearest support services.
            </li>
            <li>
              In case of critical situations, don't hesitate to call emergency numbers in your area.
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default FAQ;
