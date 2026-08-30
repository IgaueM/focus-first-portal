(() => {
  const articles = [...window.FOCUS_ARTICLES].sort((a, b) => a.priority - b.priority);
  const starterContainer = document.getElementById("starter-articles");
  const articleGrid = document.getElementById("article-grid");
  const articleStatus = document.getElementById("article-status");
  const showAllButton = document.getElementById("show-all");
  const filterButtons = [...document.querySelectorAll("[data-category]")];
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.getElementById("main-navigation");
  let activeCategory = "すべて";
  let expanded = false;

  const escapeHtml = value => value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);

  const articleCard = (article, index, starter = false) => `
    <article class="${starter ? "starter-card" : "article-card"}">
      ${starter ? `<span class="step-number">0${index + 1}</span>` : ""}
      <a class="article-image-link" href="${article.url}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(article.title)}の記事を読む">
        <img src="${article.image}" alt="${escapeHtml(article.title)}の説明画像" loading="${starter ? "eager" : "lazy"}" decoding="async">
      </a>
      <div class="article-meta"><span>${escapeHtml(article.category)}</span><span>約${article.minutes}分</span></div>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.summary)}</p>
      <a class="article-read-link" href="${article.url}" target="_blank" rel="noopener noreferrer">${starter ? "この記事を読む" : "記事を読む"}<span aria-hidden="true"> →</span></a>
    </article>`;

  const renderStarter = () => {
    const starters = articles.filter(article => article.starter).sort((a, b) => a.starter - b.starter);
    starterContainer.innerHTML = starters.map((article, index) => articleCard(article, index, true)).join("");
  };

  const filteredArticles = () => articles.filter(article => {
    return activeCategory === "すべて" || article.category === activeCategory;
  });

  const renderArticles = () => {
    const matching = filteredArticles();
    const visible = expanded || activeCategory !== "すべて" ? matching : matching.slice(0, 6);
    articleGrid.innerHTML = visible.map((article, index) => articleCard(article, index)).join("");
    const label = activeCategory === "すべて" ? "おすすめ" : `テーマ「${activeCategory}」`;
    articleStatus.textContent = `${label}の記事を${matching.length}件表示しています。`;
    showAllButton.hidden = Boolean(activeCategory !== "すべて" || expanded || matching.length <= 6);
  };

  const resetFilters = () => {
    expanded = false;
    filterButtons.forEach(button => {
      const selected = button.dataset.category === activeCategory;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  filterButtons.forEach(button => button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    resetFilters();
    renderArticles();
  }));

  showAllButton.addEventListener("click", () => {
    expanded = true;
    renderArticles();
  });

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    navigation.classList.toggle("open", !open);
  });

  navigation.addEventListener("click", event => {
    if (event.target.matches("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("open");
    }
  });

  renderStarter();
  renderArticles();
})();
