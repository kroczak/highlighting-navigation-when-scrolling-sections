import { html, css, LitElement, customElement, property } from "lit-element";

import "./section-sidebar";

class SectionDimension {
  constructor(name: string, offsetTop: number, offsetHeight: number) {
    this.name = name;
    this.offsetTop = offsetTop;
    this.offsetHeight = offsetHeight;
  }
  name: string;
  offsetTop: number; //odleglosc w pixelach od top najblizszego relatywnie umieszczonego rodzica
  offsetHeight: number; //wysokosc elelmentu
}

@customElement("section-details")
export class SectionDetails extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          min-height: calc(100vh - 225px);
        }

        p {
          margin-bottom: 15px;
        }

        .container {
          padding-top: 40px;
          width: 50%;
        }

        .container > .row {
          margin: 0 -12px;
        }

        @media (max-width: 1200px) {
          article {
            padding: 20px 0 25px 5px;
          }

          .current {
            font-weight: inherit;
          }
        }
      `,
    ];
  }

  /**
   * Returns the node into which the element should render
   * and by default creates and returns an open shadowRoot.
   * Implement to customize where the element's DOM is rendered.
   * For example, to render into the element's childNodes, return this.
   *
   * Bez tego trzeba zrobic this.shadowRoot?.querySelector
   *
   * Jak sie zwroci this, element jest renderowany do tagu section-details
   */
  // createRenderRoot() {
  //   return this;
  // }

  private _sectionsDimension: SectionDimension[] = [];

  @property({ type: String })
  private _sectionName = "summary";

  constructor() {
    super();
    this._onscroll = this._onscroll.bind(this);
    //should we implement onresize ?
    //this._onresize = this._onresize.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    window.addEventListener("scroll", this._onscroll);
    // window.addEventListener("resize", this._onresize);
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this._onscroll);
    // window.removeEventListener("resize", this._onresize);
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }

  //is it needed?
  private _onresize() {
    console.log("onresize");
  }

  //odpala sie raz na poczatku po updated,
  //tutaj mozna wykonac jednorazowo cos co odpala sie po tym jak template sie zaladowal
  //sekcje tez by mogly byc, ale jak uzytownik zmieni size okna, to juz sa inne wymiary
  firstUpdated(changedProperties: any) {
    this._getSections();
  }

  //updated odpala sie jak property sie zmienilo(w srodku metody), nie mylic z update
  //latwy sposob na sprawdzenie czy nasze property sie zmienilo
  // updated(changedProperties: any) {
  //   console.log(changedProperties);
  // }

  /**
   * DOCS
   * https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
   * https://www.w3schools.com/jsref/prop_element_offsettop.asp
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
   *
   */

  private _getSections() {
    let sections = this.shadowRoot?.querySelectorAll("section");

    sections?.forEach((element) => {
      this._sectionsDimension = [
        ...this._sectionsDimension,
        new SectionDimension(
          element.dataset.name as string,
          element.offsetTop,
          element.offsetHeight
        ),
      ];
    });

    // console.log(this._sectionsDimension);
  }

  private _getCurrentSection(fromTop: number, section: SectionDimension) {
    return (
      fromTop >= section.offsetTop &&
      fromTop <= section.offsetTop + section.offsetHeight
    );
  }

  private _onscroll() {
    const fromTop = window.scrollY;
    // console.log(fromTop);
    let currentSection = this._sectionsDimension.find((x) =>
      this._getCurrentSection(fromTop, x)
    );
    if (currentSection) {
      // console.log(currentSection.name);
      this._sectionName = currentSection.name;
    }
  }

  render() {
    return html`
      <div class="container">
        <section data-name="section1">
          <h3>Section 1</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            Duis finibus urna sed odio fringilla bibendum. Quisque eget augue
            vestibulum, faucibus augue et, tristique urna. Donec quis tempor
            tortor. Nulla posuere facilisis sapien nec ornare. Mauris metus
            arcu, malesuada ac felis at, fermentum lobortis metus. Pellentesque
            posuere consectetur elit id gravida. Nunc ut nulla vitae ipsum
            ullamcorper vehicula. Duis ac risus vel lectus gravida maximus. Nunc
            fringilla quam vel orci pretium congue. Curabitur semper scelerisque
            turpis, ut eleifend magna dictum at. Aliquam luctus libero id porta
            sollicitudin. Ut ut nisi tortor. In scelerisque dui nec ipsum
            pulvinar viverra. Aliquam elit risus, cursus quis lorem ac,
            efficitur faucibus erat. Aliquam gravida felis sit amet leo
            fermentum vulputate eu sit amet tellus. Mauris at felis ullamcorper
            mauris viverra feugiat. Integer volutpat commodo accumsan.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Aenean elit orci, dapibus nec ullamcorper
            a, congue non libero. Fusce egestas elit tincidunt, semper odio
            quis, rutrum dui. Phasellus hendrerit rutrum arcu commodo
            condimentum. Sed euismod at nunc vel laoreet. Phasellus purus
            tellus, varius vitae ante a, efficitur dictum est. Cras cursus ex in
            lectus interdum, nec efficitur diam ornare.
          </p>
        </section>
        <section data-name="section2">
          <h3>Section 2</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            Duis finibus urna sed odio fringilla bibendum. Quisque eget augue
            vestibulum, faucibus augue et, tristique urna. Donec quis tempor
            tortor. Nulla posuere facilisis sapien nec ornare. Mauris metus
            arcu, malesuada ac felis at, fermentum lobortis metus. Pellentesque
            posuere consectetur elit id gravida. Nunc ut nulla vitae ipsum
            ullamcorper vehicula. Duis ac risus vel lectus gravida maximus. Nunc
            fringilla quam vel orci pretium congue. Curabitur semper scelerisque
            turpis, ut eleifend magna dictum at. Aliquam luctus libero id porta
            sollicitudin. Ut ut nisi tortor. In scelerisque dui nec ipsum
            pulvinar viverra. Aliquam elit risus, cursus quis lorem ac,
            efficitur faucibus erat. Aliquam gravida felis sit amet leo
            fermentum vulputate eu sit amet tellus. Mauris at felis ullamcorper
            mauris viverra feugiat. Integer volutpat commodo accumsan.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Aenean elit orci, dapibus nec ullamcorper
            a, congue non libero. Fusce egestas elit tincidunt, semper odio
            quis, rutrum dui. Phasellus hendrerit rutrum arcu commodo
            condimentum. Sed euismod at nunc vel laoreet. Phasellus purus
            tellus, varius vitae ante a, efficitur dictum est. Cras cursus ex in
            lectus interdum, nec efficitur diam ornare.
          </p>
        </section>
        <section data-name="section3">
          <h3>Section 3</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            Duis finibus urna sed odio fringilla bibendum. Quisque eget augue
            vestibulum, faucibus augue et, tristique urna. Donec quis tempor
            tortor. Nulla posuere facilisis sapien nec ornare. Mauris metus
            arcu, malesuada ac felis at, fermentum lobortis metus. Pellentesque
            posuere consectetur elit id gravida. Nunc ut nulla vitae ipsum
            ullamcorper vehicula. Duis ac risus vel lectus gravida maximus. Nunc
            fringilla quam vel orci pretium congue. Curabitur semper scelerisque
            turpis, ut eleifend magna dictum at. Aliquam luctus libero id porta
            sollicitudin. Ut ut nisi tortor. In scelerisque dui nec ipsum
            pulvinar viverra. Aliquam elit risus, cursus quis lorem ac,
            efficitur faucibus erat. Aliquam gravida felis sit amet leo
            fermentum vulputate eu sit amet tellus. Mauris at felis ullamcorper
            mauris viverra feugiat. Integer volutpat commodo accumsan.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Aenean elit orci, dapibus nec ullamcorper
            a, congue non libero. Fusce egestas elit tincidunt, semper odio
            quis, rutrum dui. Phasellus hendrerit rutrum arcu commodo
            condimentum. Sed euismod at nunc vel laoreet. Phasellus purus
            tellus, varius vitae ante a, efficitur dictum est. Cras cursus ex in
            lectus interdum, nec efficitur diam ornare.
          </p>
        </section>
        <section data-name="section4">
          <h3>Section 4</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            Duis finibus urna sed odio fringilla bibendum. Quisque eget augue
            vestibulum, faucibus augue et, tristique urna. Donec quis tempor
            tortor. Nulla posuere facilisis sapien nec ornare. Mauris metus
            arcu, malesuada ac felis at, fermentum lobortis metus. Pellentesque
            posuere consectetur elit id gravida. Nunc ut nulla vitae ipsum
            ullamcorper vehicula. Duis ac risus vel lectus gravida maximus. Nunc
            fringilla quam vel orci pretium congue. Curabitur semper scelerisque
            turpis, ut eleifend magna dictum at. Aliquam luctus libero id porta
            sollicitudin. Ut ut nisi tortor. In scelerisque dui nec ipsum
            Aliquam elit risus, cursus quis lorem ac, efficitur faucibus erat.
            Aliquam gravida felis sit amet leo fermentum vulputate eu sit amet
            tellus. Mauris at felis ullamcorper mauris viverra feugiat. Integer
            volutpat commodo accumsan. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Aenean elit
            orci, dapibus nec ullamcorper a, congue non libero. Fusce egestas
            elit tincidunt, semper odio quis, rutrum dui. Phasellus hendrerit
            rutrum arcu commodo condimentum. Sed euismod at nunc vel laoreet.
            Phasellus purus tellus, varius vitae ante a, efficitur dictum est.
            Cras cursus ex in lectus interdum, nec efficitur diam ornare.
            pulvinar viverra.
          </p>
        </section>
      </div>

      <section-sidebar .sectionName="${this._sectionName}"></section-sidebar>
    `;
  }
}
