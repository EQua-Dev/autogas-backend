export interface IAttendee {
  firstName: string;
  lastName: string;
  email: string;
  occupation: string;
  gender: string;
  phoneNumber: string;
  state: string;
  hearAboutUs: string;
  registrationCode: string;
  registeredAt: Date;
}

export interface IConferenceDetails {
  name: string;
  date: string;
  time: string;
  venue: string;
  theme: string;
}

export interface IRegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  occupation: string;
  gender: string;
  phoneNumber: string;
  state: string;
  hearAboutUs: string;
}