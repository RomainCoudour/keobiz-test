export default class Client {
  id: number;
  firstName: string;
  lastName: string;

  constructor({
    id,
    firstName,
    lastName,
  }: {
    id: number;
    firstName: string;
    lastName: string;
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
