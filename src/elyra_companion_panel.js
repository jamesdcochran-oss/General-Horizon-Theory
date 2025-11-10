customElements.define('gh-companion', class extends HTMLElement{
  connectedCallback(){
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host{all:initial;font-family:system-ui,sans-serif;display:block}
        .wrap{background:#0e173e;color:#ebf2ff;border:1px solid #222c66;border-radius:12px;padding:12px}
        h3{margin:0 0 8px 0;font-size:16px}
        .small{opacity:.8;font-size:12px}
        .callout{border-left:4px solid #ffd24d;padding:8px;background:#0b1434;border-radius:8px;margin:8px 0}
        code{background:#0c1433;border:1px solid #23306a;border-radius:6px;padding:1px 4px}
      </style>
      <div class="wrap">
        <h3>Horizon Principle — Quick Guide</h3>
        <div class="small">Rule: when flow ≳ capacity, a horizon forms.</div>
        <div class="callout"><strong>Predictive check:</strong> if <code>Flow/Capacity</code> ≈ 1 → expect a boundary; raise capacity or smooth flow.</div>
        <ul>
          <li>Black holes → event horizon</li>
          <li>Optics → fog wall</li>
          <li>Plasma → sheath/shock</li>
          <li>Networks → congestion</li>
        </ul>
      </div>
    `;
  }
});
