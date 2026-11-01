# ⚙️ Как подключить Obsidian

1. Установите **Git**: https://git-scm.com/downloads (на Mac он уже есть).
2. Установите **Obsidian**: https://obsidian.md — аккаунт не нужен.
3. Скачайте репозиторий (в терминале / Git Bash):
   ```
   git clone -b claude/hopeful-thompson-hblbqu https://github.com/nikolairodkin/testsaitprototip123.git
   ```
4. В Obsidian: **Open folder as vault** → выберите папку `testsaitprototip123/notes`.
5. Настройки → **Community plugins** → включить → найти **Git** (Obsidian Git) → Install → Enable.
6. В настройках плагина включите **Auto pull** (например, каждые 5 минут) и **Auto commit-and-sync**.

Теперь: что пишет Claude — появляется у вас, что пишете вы — уходит в GitHub.

> ⚠️ Репозиторий **публичный**. Не храните здесь пароли и личные данные.
