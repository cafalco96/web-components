class Porcentajes extends HTMLElement {
  constructor() {
    super();
    this.result;
  }
  static get observedAttributes() {
    return ["result"];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName && attrName === "result") {
      this.result = parseInt(newValue);
      console.log(this.result, typeof this.result);
    }
  }
  connectedCallback() {
    this.innerHTML = `
    <h1>Resultado Encuesta</h1>
    <div class="signal-bars">
    <div class="bar bar-25"></div>
    <div class="bar bar-50"></div>
    <div class="bar bar-75"></div>
    <div class="bar bar-100"></div>
</div>
     `;
    this.bars = this.querySelectorAll(".bar");
    this.actualizarColores();
  }
  actualizarColores() {
    if (this.result !== undefined) {
      this.bars.forEach((bar, index) => {
        if (this.result >= (index + 1) * 25) {
          bar.style.backgroundColor = "#000";
        } else {
          bar.style.backgroundColor = "#ccc";
        }
      });
    }
  }
}
window.customElements.define("porcentajes-resultado", Porcentajes);

////

class List extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "open" });
    this.divHeader = document.createElement("div");
    this.divContent = document.createElement("div");
    this.divHeader.innerHTML = "holi";
    this.divContent.innerHTML = "";
    shadow.appendChild(this.divHeader);
    shadow.append(this.divContent);
  }
  connectedCallback() {
    this.divHeader.innerHTML = this.getAttribute("list-title");
    const url = this.getAttribute("data-url");
    const field = this.getAttribute("data-field");
    fetch(url)
      .then((res) => res.json())
      .then((users) =>
        users.forEach((user) => {
          this.divContent.innerHTML += `
    <ul>
     <li>${user[field]}</li>
     </ul>
`;
        })
      );
  }
}
window.customElements.define("list-tag", List);
