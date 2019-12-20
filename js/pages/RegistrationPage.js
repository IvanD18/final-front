export default class RegistrationPage {
    constructor(context) {
        this._context = context;
        this._rootEl = context.rootEl();
    }

    init() {
        this._rootEl.innerHTML = `<font color="black">
      
        <div class="row" align="center">
            <div class="col" >
              <div class="card">
                <div class="card-body">
                  <form data-id="logup-form">
                  <div class="form-group">
                      <label for="name-input">Имя</label>
                      <input type="text" data-id="name-input" class="form-control" id="name-input">
                    </div>
                    <div class="form-group">
                      <label for="login-input">Логин</label>
                      <input type="text" data-id="login-input" class="form-control" id="login-input">
                    </div>
                    <div class="form-group">
                      <label for="password-input">Пароль</label>
                      <input type="password" data-id="password-input" class="form-control" id="password-input">
                    </div>
                    <button type="submit" class="btn btn-primary" data-id="log-up" align="right">Регистрация</button>
                    <a class="btn btn-secondary" data-id="exist" align="right">Есть аккаунт</a>
                  </form>
                </div>
              </div>
            </div>
        </div>
      </font>
    `;
        this._rootEl.querySelector('[data-id=exist]').addEventListener('click', evt => {
            evt.preventDefault();
            localStorage.setItem('marker',"");
            document.location.href="/";
        });

            this._errorModal = $('[data-id=error-modal]'); // jquery
            this._errorMessageEl = this._rootEl.querySelector('[data-id=error-message]');



        this._rootEl.querySelector('[data-id=logup-form]').addEventListener('submit', evt => {
            evt.preventDefault();
            this._nameInputEl = this._rootEl.querySelector('[data-id=name-input]');
            this._usInputEl = this._rootEl.querySelector('[data-id=login-input]');
            this._pwInputEl = this._rootEl.querySelector('[data-id=password-input]');

            const data = {
                name:  this._nameInputEl.value,
                username: this._usInputEl.value,
                password: this._pwInputEl.value
            };
            this._context.post('/users/registration', JSON.stringify(data), {'Content-Type': 'application/json'},
                null,error => {
                    this.showError(error);
                });
        });
    }
    showError(error) {
        const data = JSON.parse(error);
        if(data.status==401){
            data.message="error.unauthorized";
        }
        if(data.status==403){
            data.message="error.access";
        }
        if(data.status==400){
            data.message="error.bad_filetype";
        }
        const message = this._context.translate(data.message);
        this._errorMessageEl.textContent = message;
        this._errorModal.modal('show');
    }

}