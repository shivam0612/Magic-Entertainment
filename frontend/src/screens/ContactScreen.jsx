import React from 'react'
import FormContainer from './../components/FormContainer';

const ContactScreen = () => {
  return (
    <FormContainer>
      <div>
        <div className="contact-form-wrapper unique-contact-form-wrapper d-flex justify-content-center">
          <form action="#" className="contact-form shadow unique-contact-form">
            <h5 className="title unique-title">Contact us</h5>
            <p className="description unique-description">Feel free to contact us if you need any assistance, any help or another question.</p>
            <div>
              <input type="text" className="form-control rounded border-white mb-3 form-input unique-form-input" id="name" placeholder="Name" required />
            </div>
            <div>
              <input type="email" className="form-control rounded border-white mb-3 form-input unique-form-input" placeholder="Email" required />
            </div>
            <div>
              <textarea id="message" className="form-control rounded border-white mb-3 form-text-area unique-form-text-area" rows="5" cols="30" placeholder="Message" required></textarea>
            </div>
            <div className="submit-button-wrapper  unique-submit-button-wrapper">
              <input type="submit" className='bg-primary' value="Send" />
            </div>
          </form>
        </div>
      </div>

    </FormContainer>
  )
}

export default ContactScreen
