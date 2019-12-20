export default class ProfilePage {
    constructor(context) {
        this._context = context;
        this._rootEl = context.rootEl();
    }

    init() {
        this._rootEl.innerHTML = `
      <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${JSON.parse(localStorage.getItem('profile')).name}</h5>
      <p class="card-text">${JSON.parse(localStorage.getItem('profile')).login}</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
    `;

    }

    destroy() { }
}