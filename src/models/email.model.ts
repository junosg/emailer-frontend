export interface Email extends Object {
    to: string,
    subject: string,
    text: string,
    html: string
}

export const defaultEmail: Email = {
    to: '',
    subject: 'For testing purposes.',
    text: 'Hi, this is for testing purposes only.',
    html: '<h3>Cheers, testing.</h3>'
}