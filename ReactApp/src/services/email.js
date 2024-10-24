import emailjs from 'emailjs-com';

export const sendEmail = (templateParams) => {
    return emailjs.send(
        'service_umjt818', //  Service ID
        'template_wqx9i4h', //  Template ID
        templateParams,
        '6_AvP8dwvB6fkNRg3' //  User ID
    );
};