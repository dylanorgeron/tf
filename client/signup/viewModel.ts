import ko from 'knockout'
import $ from 'jquery'

export default class {
  public username = ko.observable('')
  public email = ko.observable('')
  public password = ko.observable('')

  createAccount() {
    console.log('creating account')
    $.ajax({
      type: "POST",
      url: `${window.location.hostname}:8081/api/Account/Create`,
      data: {
        username: this.username(),
        email: this.email(),
        password: this.password()
      },
      success: (res) => {
        console.log(res)
      },
    })
  }
}
