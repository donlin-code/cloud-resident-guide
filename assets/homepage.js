'use strict';
(() => {
  const data = JSON.parse(document.getElementById('navigation-data').textContent);
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const list = items => '<ul>' + items.map(s => '<li>' + escape(s) + '</li>').join('') + '</ul>';
  const search = $('#tool-search');
  let category = 'all';
  let selected = data.tools[0].id;

  // Use the existing article theme key, including when localStorage is unavailable.
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const themeSelect = $('#theme-select');
  let preference = 'system';
  try {
    const stored = localStorage.getItem('cloud-resident-theme');
    if (['light', 'dark', 'system'].includes(stored)) preference = stored;
  } catch {}
  function applyTheme() {
    document.documentElement.dataset.theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
    themeSelect.value = preference;
  }
  themeSelect.addEventListener('change', () => {
    preference = themeSelect.value;
    applyTheme();
    try { localStorage.setItem('cloud-resident-theme', preference); } catch {}
  });
  media.addEventListener('change', () => { if (preference === 'system') applyTheme(); });
  window.addEventListener('storage', event => {
    if (event.key === 'cloud-resident-theme' || event.key === null) {
      preference = ['light', 'dark', 'system'].includes(event.newValue) ? event.newValue : 'system';
      applyTheme();
    }
  });
  applyTheme();

  function showTool(id, announce = false) {
    const tool = data.tools.find(t => t.id === id);
    if (!tool) return;
    selected = id;
    const group = data.categories.find(c => c.id === tool.category);
    const number = data.categories.indexOf(group) + 1;
    const official = tool.official.length ? '<div class="official-links">' + tool.official.map(l => '<div class="official-link-item"><a href="' + escape(l.url) + '" target="_blank" rel="noopener noreferrer">' + escape(l.label) + ' ↗</a><small>' + escape(l.checkNote) + '</small></div>').join('') + '</div>' : '<p class="pending-official">具体运营商或银行入口将在专题明确后补充，暂不推荐特定产品。</p>';
    $('#tool-detail').innerHTML = '<div class="detail-top"><span class="eyebrow">0' + number + ' / ' + escape(group.name) + '</span><span class="status-pill">基础介绍</span></div>' +
      '<h3 id="detail-title" tabindex="-1">' + escape(tool.name) + '</h3><p class="detail-intro">' + escape(tool.summary) + '</p>' +
      '<div class="detail-columns"><section><h4>它能帮你做什么</h4>' + list(tool.uses) + '</section><section><h4>开始前，准备这些</h4>' + list(tool.prepare) + '</section></div>' +
      '<section class="issue-box"><h4>新手容易卡在哪里？</h4>' + list(tool.issues) + '</section>' +
      '<section class="chapter-section"><div class="chapter-head"><h4>接下来会讲什么</h4><span class="status-pill">文档待补充</span></div><ol class="chapter-list">' + tool.chapters.map((s,i) => '<li><span>0' + (i+1) + '</span>' + escape(s) + '</li>').join('') + '</ol></section>' +
      '<section class="official-section"><h4>去官方核对</h4>' + official + '<p class="source-note">入口检查：' + escape(data.updated) + '。部分链接在本次环境中未能打开，已标注待验证；个人资格、费用与具体操作仍待逐项核查，尚无本人实测结论。</p></section>';
    $$('[data-tool]').forEach(b => {
      if (b.dataset.tool === id) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    if (announce) {
      $('#detail-title').focus({preventScroll:true});
      if (window.matchMedia('(max-width:760px)').matches) $('#tool-detail').scrollIntoView({block:'start'});
    }
  }

  const normalize = value => value.normalize('NFKC').toLocaleLowerCase().replace(/[\s/／·_-]+/g, '');
  const searchable = new Map(data.tools.map(tool => {
    const group = data.categories.find(c => c.id === tool.category);
    return [tool.id, normalize([tool.name, ...tool.alias, tool.summary, ...tool.uses, ...tool.prepare, ...tool.issues, ...tool.chapters, group.name, group.keywords].join(' '))];
  }));
  function filter() {
    const raw = search.value.trim();
    const query = normalize(raw);
    const results = data.tools.filter(t => (category === 'all' || t.category === category) && searchable.get(t.id).includes(query));
    const allowed = new Set(results.map(t => t.id));
    $$('[data-tool]').forEach(b => { b.hidden = !allowed.has(b.dataset.tool); });
    $$('[data-group]').forEach(group => {
      group.hidden = !results.some(t => t.category === group.dataset.group);
      if (query || category !== 'all') group.open = !group.hidden;
    });
    $$('[data-category]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.category === category)));
    $('#current-category').textContent = category === 'all' ? '全部工具' : data.categories.find(c => c.id === category).name;
    $('#reset-filter').hidden = category === 'all' && !raw;
    $('#clear-search').hidden = !search.value;
    $('#tree-empty').hidden = results.length > 0;
    $('#result-status').textContent = raw ? '“' + raw + '” 找到 ' + results.length + ' 项相关工具与主题' : results.length + ' 项工具与主题 · 详细教程持续补充';
    if (!results.length) {
      $('#tool-detail').innerHTML = '<div class="detail-empty"><h3 id="detail-title">换个关键词，再找找看。</h3><p>工具名称、用途和常见问题都可以搜索。<br>也可以点击左边的「查看全部工具」。</p></div>';
      $$('[data-tool]').forEach(b => b.removeAttribute('aria-current'));
    } else if (!allowed.has(selected) || !$('#tool-detail .detail-top')) {
      showTool(results[0].id);
    }
    return results;
  }
  function reset() {
    category = 'all';
    search.value = '';
    filter();
    const tool = data.tools.find(t => t.id === selected);
    $$('[data-group]').forEach(g => { g.open = g.dataset.group === tool.category; });
  }
  $$('[data-category]').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    search.value = '';
    filter();
    $('#directory').scrollIntoView({block:'start'});
  }));
  $$('[data-tool]').forEach(button => button.addEventListener('click', () => showTool(button.dataset.tool, true)));
  search.addEventListener('input', filter);
  $('#search-form').addEventListener('submit', event => {
    event.preventDefault();
    filter();
    $('#directory').scrollIntoView({block:'start'});
    $('#directory-title').setAttribute('tabindex', '-1');
    $('#directory-title').focus({preventScroll:true});
  });
  $('#clear-search').addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
  $('#reset-filter').addEventListener('click', reset);
  $('#empty-reset').addEventListener('click', () => { reset(); $('#directory-title').setAttribute('tabindex', '-1'); $('#directory-title').focus({preventScroll:true}); });
  $$('[data-query]').forEach(button => button.addEventListener('click', () => {
    category = 'all';
    search.value = button.dataset.query;
    filter();
    $('#directory').scrollIntoView({block:'start'});
  }));

  function showRegion(id) {
    const region = data.regions.find(r => r.id === id);
    $$('[data-region]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.region === id)));
    $('#region-panel').innerHTML = '<div class="region-overview"><span class="eyebrow">' + escape(region.label) + '</span><h3>' + escape(region.name) + '</h3><span class="status-pill">' + escape(region.status) + '</span><p>' + escape(region.description) + '</p></div>' +
      '<div class="region-content"><h4>这一站，先研究这些</h4><ul>' + region.topics.map(t=>'<li><span aria-hidden="true">↗</span>' + escape(t) + '</li>').join('') + '</ul><p class="source-note">' + escape(region.note) + '</p></div>';
  }
  $$('[data-region]').forEach(button => button.addEventListener('click', () => showRegion(button.dataset.region)));
  filter();
})();
