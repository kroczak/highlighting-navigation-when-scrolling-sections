import { LitElement, html, customElement, property } from "lit-element";

@customElement("dummy-element")
export class HelloWorldElem extends LitElement {
  @property({ type: String }) title: string = "default title";
  render() {
    return html`
      <style>
        .container {
          padding: 30px;
          text-align: center;
          background: #c8e7fd;
        }
        .container h1 {
          font-size: 50px;
        }
      </style>
      <div class="container">
        <h1>${this.title}</h1>
        <p>Scrolling through sections should reflect navigation pane</p>
      </div>
    `;
  }
}
