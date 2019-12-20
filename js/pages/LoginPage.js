// TODO: remove code duplication
export default class LoginPage {
  constructor(context) {
    this._context = context;
    this._rootEl = context.rootEl();
  }

  init() {
    this._rootEl.innerHTML = `<font color="black">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Network</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-supported-content">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbar-supported-content">
            <ul class="navbar-nav mr-auto"></ul>
            <form data-id="search-form" class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <form data-id="login-form">
                    <div class="form-group">
                      <label for="login-input">Логин</label>
                      <input type="text" data-id="login-input" class="form-control" id="login-input">
                    </div>
                    <div class="form-group">
                      <label for="password-input">Пароль</label>
                      <input type="password" data-id="password-input" class="form-control" id="password-input">
                    </div>
                    <button type="submit" class="btn btn-primary">Вход</button>
                                  <a class="btn btn-secondary" data-id="not-exist" align="right">Нет аккаунта</a>

                  </form>
                </div>
              </div>
            </div>
        </div>
      </div>
      <!-- TODO: https://getbootstrap.com/docs/4.4/components/modal/ -->
      <div class="modal fade" data-id="error-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Error!</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div data-id="error-message" class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      </font>
    `;
      this._rootEl.querySelector('[data-id=not-exist]').addEventListener('click', evt => {
          evt.preventDefault();
          localStorage.setItem('marker',"reg");
          document.location.href="/registration";
      });
    this._errorModal = $('[data-id=error-modal]'); // jquery
    this._errorMessageEl = this._rootEl.querySelector('[data-id=error-message]');

    this._loginFormEl = this._rootEl.querySelector('[data-id=login-form]');
    this._loginInputEl = this._loginFormEl.querySelector('[data-id=login-input]');
    this._passwordInputEl = this._loginFormEl.querySelector('[data-id=password-input]');

    this._loginFormEl.addEventListener('submit', evt => {
      evt.preventDefault();
      const login = this._loginInputEl.value;
      const password = this._passwordInputEl.value;

      // Make request only for verify login and password
      this._context.get('/users/me', {'Authorization': `Basic ${btoa(login + ':' + password)}`},
        text => {
          this._context.login(login, password, text);
        },
        error => {

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

  destroy() { }
}
