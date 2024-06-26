import { FormEvent, useRef, useState } from 'react';
import './Contact.scss';
import TextBox from '../../components/textbox/TextBox';
import StandardButton from '../../components/buttons/standard-button/StandardButton';
import emailjs from '@emailjs/browser';
import { Modal } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

interface Props {
  theme: string;
}

//todo update this page with email functionality
/*
For this component we need to do the following things:
• Add contact, phone number, email
• Add emailjs text boxes
• Send test email
*/
function Contact({ theme }: Props) {
  const form = useRef(document.createElement('form') as HTMLFormElement);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token); // Update the token when reCAPTCHA is completed
  };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setModalMessage(reCaptchaModalMessage);
      setShowModal(true);
      console.log('Must complete the required reCaptcha.');
    } else {
      emailjs
        .sendForm(
          'service_k7snms6',
          'template_yev6pmo',
          form.current,
          'TvHHQV2wGllq9UwJo'
        )
        .then(
          (result) => {
            clearInputs();
            setModalMessage(successModalMessage);
            setShowModal(true);
            console.log(result.text);
            if (recaptchaRef.current) {
              recaptchaRef.current.reset(); // Clear the reCAPTCHA
              setRecaptchaToken(null); // Reset token to ensure reCAPTCHA is required again
            }
          },
          (error) => {
            clearInputs();
            setModalMessage(errorModalMessage);
            setShowModal(true);
            console.log(error.text);
            if (recaptchaRef.current) {
              recaptchaRef.current.reset(); // Clear the reCAPTCHA
              setRecaptchaToken(null); // Reset token to ensure reCAPTCHA is required again
            }
          }
        );
    }
  };

  function clearModal() {
    console.log('Clearing modal');
    setShowModal(false);
  }

  function clearInputs() {
    form.current.reset();
  }

  return (
    <>
      <div className="primary-content-wrapper">
        <div id="contact-page-content">
          <h1 className="animate__animated animate__bounce" id="contact-title">
            CONTACT
          </h1>
          <TextBox theme={theme}>
            <h4 id="contact-header-text">
              Feel free to send me a message if you have any questions!
            </h4>
            <div id="contact-form-wrapper">
              <form
                className={`${theme} contact-form`}
                ref={form}
                onSubmit={sendEmail}
              >
                <label>Name</label>
                <input
                  className={`${theme} input-form`}
                  type="text"
                  name="user_name"
                  required={true}
                  minLength={1}
                />
                <label>Email</label>
                <input
                  className={`${theme} input-form`}
                  type="email"
                  name="user_email"
                />
                <label>Message</label>
                <textarea
                  className={`${theme} input-form`}
                  name="message"
                  required={true}
                  minLength={1}
                  maxLength={500}
                />
                <div id="recaptcha">
                  <ReCAPTCHA
                    sitekey="6Ld_wMMpAAAAAHwhlGkwGzZ089vV27EgnY4q5sHv" // The reCAPTCHA site key
                    onChange={handleRecaptchaChange}
                    ref={recaptchaRef} // Assign reference to reCAPTCHA
                  />
                </div>
                <Modal
                  className="standard-text-dark"
                  show={showModal}
                  onHide={() => clearModal()}
                >
                  <Modal.Body>{modalMessage}</Modal.Body>
                  <Modal.Footer>
                    <StandardButton invert={true} onClick={() => clearModal()}>
                      Close
                    </StandardButton>
                  </Modal.Footer>
                </Modal>
                <StandardButton
                  animation="animate__animated animate__slideInUp"
                  addArrowIcon={true}
                  type="submit"
                >
                  Submit
                </StandardButton>
              </form>
            </div>
          </TextBox>
        </div>
      </div>
    </>
  );
}

const successModalMessage = 'Your message has been sent!';
const errorModalMessage =
  'There was a problem sending your message. Please try again.';
const reCaptchaModalMessage =
  'Please complete the required reCaptcha form to send your message.';

export default Contact;
